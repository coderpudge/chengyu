// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        game: {
            default: null,
            serializable: false
        },
        word:{
            default:null,
            type:cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.log("worditem onload")
        this.node.on(cc.Node.EventType.TOUCH_START,this.ontouchstart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.ontouchmove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.ontouchend,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.ontouchcancel,this);
    },
    ontouchstart(event){
        cc.log("ontouchstart")
    },
    ontouchmove(event){
        cc.log("ontouchmove")
    },
    ontouchend(event){
        cc.log("ontouchend")
        this.game.onClick(this.word.string)
    },
    ontouchcancel(event){
        cc.log("ontouchcancel")
    },
    onEnable(){
        this.node.on(cc.Node.EventType.TOUCH_START,this.ontouchstart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.ontouchmove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.ontouchend,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.ontouchcancel,this);
    },
    onDisable(){
        this.node.off(cc.Node.EventType.TOUCH_START,this.ontouchstart,this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this.ontouchmove,this);
        this.node.off(cc.Node.EventType.TOUCH_END,this.ontouchend,this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL,this.ontouchcancel,this);
    },
    start () {

    },
    init(str) {
        // cc.log("wordItem:",str);
        this.word.string = str;
    },
    update (dt) {

    },
});
