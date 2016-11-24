# dialogBox
弹框插件

* 1.alert弹框
* 2.confirm弹窗
* 3.loading弹窗 

###options

* title: '提示', //弹框标题
* message: '', //弹框内容
* confirm: '确认', //确认按钮
* cancel: '取消', //取消按钮
* showMask: false, //是否显示遮盖层（只有loading弹框使用），默认值false
* maskCancel: false, //点击弹框外是否关闭，默认值false
* type: 'alert', //按钮类型   alert：提示；confirm：警告
* slide: true, //从上向下滚动显示:默认值true
* time: 0, //time>0(单位毫秒)弹窗在对应时间后自动关闭
* callback: null //按钮回调函数    result:0  点击取消按钮；1 点击确认按钮
