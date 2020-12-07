import {Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {IconConstant, IconCustom} from '../icon';
import {toast} from '../toast';
import {_Loading} from '../form/baseCom';
import Video from 'react-native-video';
import * as ImagePicker from '../image-picker';
import Uploader from 'react-native-background-upload';

const {width, height} = Dimensions.get('window');
/**
 * 文件类型，
 * @type {{RECORD_VIDEO: number, RECORD_IMG: number}}
 */
export const FileType={
  RECORD_IMG:'1',       //描述记录图片
  RECORD_VIDEO:'2',     //描述记录视频
}

/**
 * 拍摄视频组建，包含视频展示
 * @returns {*}
 * @constructor
 */
export function VideoPicker(props) {
  let [loading, setLoading] = useState({show: false, msg: '上传中...'});//上传提示框
  let [itemCtnerWidth, setItemCtnerWidth] = useState(0);//上传提示框
  let [list, setList] = useState(props.list || []);//列表数据
  const options = {
    title: '',
    mediaType: 'video',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const picker = function() {
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};
        uploadFn({
          url: response.uri,
          param: {
            targetId: '1',               //
            type: FileType.RECORD_IMG,   //
          },
          progress: (data) => {
            setLoading({
              show: true,
              msg: data.progress + '%',
            });
            console.log(data);
          },
          error: (data) => {
            console.log(data);
            setLoading({
              show: false,
              msg: '上传中...',
            });
          },
          complete: (data) => {
            data = data.data;
            // http://localhost:8080/thumbnail/2020-04/00fe13b7df8d4b8f973e18b30ea4df6d_f.jpg
            setList([
              ...list,
              {
                img: data.path,
                url: data.path,
                withClose: true,
                id: data.fileId,
              },
            ]);
            setLoading({
              show: false,
              msg: '上传中...',
            });
          },
        })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };
  return <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}
    onLayout={(event) => {
      let {x, y, width, height} = event.nativeEvent.layout;
      setItemCtnerWidth(((width - 50) / 4));
    }}
  >
    {
      itemCtnerWidth ? list.map((item, index) => {
        item.itemCtnerWidth = itemCtnerWidth;
        return <VideoView
          key={index}
          {...item}
        />;
      }) : <_Loading/>
    }
    <TouchableOpacity
      style={{
        borderWidth: 0.5,
        borderColor: '#ddd',
        width: itemCtnerWidth,
        height: itemCtnerWidth,
        borderRadius: 2,
        paddingLeft: (itemCtnerWidth - 40) / 2,
        paddingTop: (itemCtnerWidth - 40) / 2,
      }}
      onPress={() => {
        picker();
      }}
    >
      <IconCustom
        name={IconConstant.CAMERA}
        color={'#999'}
        size={40}
        onPress={() => {
          picker();
        }}
      ></IconCustom>
    </TouchableOpacity>
    <Modal
      animationType="slide"
      transparent={true}
      visible={loading.show}
      style={{
        width: 100, height: 40,
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              color: '#666',
            }}
          >{loading.msg}</Text>
        </View>
      </View>

    </Modal>
  </View>;
}

/**
 * 上传函数
 * opt.url           文件路径
 * opt.param         额外参数
 * opt.progress:fun  上传进度
 * opt.error:fun     上传错误
 * opt.cancel:fun    取消上传
 * opt.complete:fun  上传完成
 * @param opt
 */
function uploadFn(opt) {
  const self = this;
  return new Promise((resolve, reject) => {
    const options = {
      url: domain + '/api/v1/upload',
      path: opt.url,
      parameters: opt.param || {},
      method: 'POST',
      field: 'file',
      type: 'multipart',
      maxRetries: 2, //set retry count (Android only). Default 2
      headers: {
        'content-type': 'application/octet-stream', // Customize content-type
      },
      notification: {
        enabled: false,
      },
    };
    Uploader.startUpload(options).then((uploadId) => {
      Uploader.addListener('progress', uploadId, (data) => {
        opt.progress && opt.progress(data);
      });
      Uploader.addListener('error', uploadId, (data) => {
        opt.error && opt.error(data);
      });

      Uploader.addListener('cancelled', uploadId, (data) => {
        opt.cancel && opt.cancel(data);
      });
      Uploader.addListener('completed', uploadId, (data) => {
        let resData = JSON.parse(data.responseBody);
        resolve(resData);
        opt.complete && opt.complete(resData);
      });
    }).catch((err) => {
      reject(err);
      console.log('Upload error!', err);
    });
  });

}


/**
 * 上传视频按钮
 * @returns {*}
 * @constructor
 */
export function VideoPickerBtn() {
  const options = {
    title: '',
    mediaType: 'video',
    // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  return <View>
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: '#999',
        width: 100,
        height: 100,
        paddingTop: 30,
        borderRadius: 3,
        paddingLeft: 30,
      }}
      onPress={() => {
        ImagePicker.launchCamera(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
          }
        });
      }}
    >
      <IconCustom
        name={IconConstant.CAMERA}
        color={'#AAA'}
        size={40}
        onPress={() => {
          // setViewVideo(false);
        }}
      ></IconCustom>
    </TouchableOpacity>
  </View>;
}

/**
 * props.img 预览图
 * props.id  图片ID,可根据此ID删除图片
 * props.withClose:bool  是否显示删除按钮
 * props.url 视频地址
 * @param props
 * @returns {*}
 * @constructor
 */
export function VideoView(props) {
  let [viewVideo, setViewVideo] = useState(false);
  let [itemCtnerWidth, setItemCtnerWidth] = useState(0);
  let [destroySelf, setDestroySelf] = useState(false);
  if (destroySelf) {
    return <View></View>;
  }
  return <View
    style={{
      width: props.itemCtnerWidth || 30,
    }}
  >
    <Modal
      animationType="slide"
      visible={viewVideo}
      onRequestClose={() => {
      }}
    >
      <TouchableOpacity
        style={{
          textAlign: 'right',
          position: 'absolute',
          zIndex: 10,
          right: 0,
          backgroundColor: 'transparent',
          top: 10, width: 50,
        }}
        onPress={() => {
          setViewVideo(false);
        }}
      >
        <IconCustom
          name={IconConstant.CIRCLE_CLOSE}
          color={'#dd0000'}
          size={24}
          onPress={() => {
            setViewVideo(false);
          }}
        ></IconCustom>
      </TouchableOpacity>
      <Video
        source={{uri: props.url ? props.url : 'http://192.168.31.39:8080/background.mp4'}}   // Can be a URL or a local file.
        ref={(ref) => {
          // this.player = ref;
        }}
        fullscreen={true}// Store reference
        fullscreenOrientation={'landscape'}
        controls={true}
        onBuffer={() => {

        }}                // Callback when remote video is buffering
        onError={() => {
        }}            // Callback when video cannot be loaded
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}/>
    </Modal>
    <TouchableOpacity
      onPress={() => {
        // setViewVideo(true);
      }}
      style={{
        height: 100,
        marginTop: 10,
        borderWidth: 1,
        // borderColor: '#ddd',
        marginLeft: 0,
        marginRight: 10,
        position: 'relative',
      }}
    >
      <Image
        style={{width: '100%', height: 100}}
        source={{uri: props.img || 'http://t7.baidu.com/it/u=993252483,2562887706&fm=79&app=86&f=JPEG?w=1280&h=853'}}
      />
      {
        props.withClose ? <View
          style={{
            position: 'absolute',
            top: -1, right: 1,
            backgroundColor: 'transparent',
          }}
        >
          <IconCustom
            name={IconConstant.CIRCLE_CLOSE}
            color={'#aa0000'}
            size={24}
            onPress={() => {
              if (props.id)
                // setViewVideo(true);
              {
                del(RequestUrl.FILE + props.id)
                  .then(res => {
                    setDestroySelf(true);
                  })
                  .catch(e => {
                    toast('操作失败');
                  });
              }
            }}
          ></IconCustom>
        </View> : null
      }
      <View
        style={{
          position: 'absolute',
          top: 24, right: 25,
        }}
      >
        <IconCustom
          name={IconConstant.VIDEO_PLAY}
          color={'#ddd'}
          size={40}
          onPress={() => {
            setViewVideo(true);
          }}
        ></IconCustom>
      </View>
    </TouchableOpacity>
  </View>;
}


const styles = StyleSheet.create({
  loadingBox: { // Loading居中
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明
  },
  inlineFilterItem: {
    paddingRight: 20,
    paddingTop: 0,
    // borderWidth:1,
    paddingBottom: 0,
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  inlineFilterLabelItem: {
    marginTop: 0,
    // borderWidth:1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 0,
    paddingBottom: 7,
    paddingTop: 7,
  },
  downPop: {
    borderTopWidth: 0.5,
    borderColor: '#eee',
    position: 'relative',
    top: 100,
    right: 0,
    borderWidth: 1,
    left: 0,
    bottom: 0,
    flex: 1,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  downPopPanel: {
    backgroundColor: '#FFF',
    elevation: 1,
    shadowOffset: {
      width: 0,
    },
  },
  downPopShadow: {
    height: 1300,
    backgroundColor: '#333',
    shadowOffset: {
      width: 1,
      height: 10,
    },
    // position: 'relative',
    opacity: 0.6,
    elevation: 1,
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // marginTop: 22
  },
  modalBottomViewContainer: {
    flex: 1,
    // height:400,
    position: 'relative',
    borderWidth: 1,
    justifyContent: 'flex-end',
    // alignItems: "flex-end",
    // backgroundColor: "#fff",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 35,
    height: 500,
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  modalBottomView: {
    // margin: 20,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 40,
  },
});
