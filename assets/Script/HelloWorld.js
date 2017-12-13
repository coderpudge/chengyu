
cc.Class({
    extends: cc.Component,

    properties: {
        idioms : {
            default:[],
            type:cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        wordListNode:{
            default: null,
            type: cc.Node
        },
        wordItem:{
            default:null,
            type:cc.Prefab
        },
        scoreLabel:{
            default:null,
            type:cc.Label
        },
        progress:cc.Sprite,
        _idiomLib:[],  //成语字库
        _idiomList:[],//随机成语集合
        _wordList:[], //随机字集
        _score:0, //积分
        speed: 0.1,

    },

    // use this for initialization
    onLoad: function () {
        
        var self = this;
        cc.loader.loadRes("wordList",function(err,json){
            if (err) {
                cc.error(err.message || err);
                return;
            }
            // cc.log('Result should be a prefab: ' + (json instanceof cc.json));
            cc.log(JSON.stringify(json));
            self._idiomLib=json;
            self.initList(self._idiomLib);
        });
    },
    initList:function(json){
        var num = 10;
        var len = this._idiomLib.length;
        for (let i = 0; i < num; i++) {
            var rdm = this.getRandomInt(0,len-1);
            this._idiomList.push(rdm);
            var idiom = this._idiomLib[rdm].split("");
            this._wordList = this._wordList.concat(idiom);
        }
        cc.log(JSON.stringify(this._wordList));  
        this.showWordList();
    },
    showWordList(){
        this._wordList.sort(this.randomsort);
        cc.log("换位后:",JSON.stringify(this._wordList));  
        this.wordListNode.removeAllChildren();
        for (let i = 0; i < this._wordList.length; i++) {
            var prefab = cc.instantiate(this.wordItem);
            var script = prefab.getComponent("wordItem")
            script.game = this;
            script.init(this._wordList[i]);
            this.wordListNode.addChild(prefab);
        }
        
    },
    onClick(word){
        cc.log("on word click:")
        if (this.idioms[this.idioms.length-1].string != "") {
            for (let i = 0; i < this.idioms.length; i++) {
                this.idioms[i].string = "";
            }
        }
        for (let i = 0; i < this.idioms.length; i++) {
            const element = this.idioms[i];
            if (element.string == "") {
                element.string = word;
                return;
            }
        }
    },
    onChooseSuccess(score){
        for (let i = 0; i < this.idioms.length; i++) {
            var act1 = cc.scaleTo(1,2);
            var act2 = cc.scaleTo(1,1);
            var cb = cc.callFunc(function() {
                this.idioms[i].string =""
            },this);
            var seq = cc.sequence(act1,act2,cb);
            this.idioms[i].node.runAction(seq);
        }
        this._score += score;
        this.scoreLabel.string = this._score;
    },
    getRandomInt:function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    randomsort(a, b) {
        return Math.random()>.5 ? -1 : 1;
        //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    },
    updateProgress(sprite,dt){
        var fillStart = sprite.fillStart;
        fillStart = fillStart > 0 ? fillStart -= (dt * this.speed) : 1;
        sprite.fillStart = fillStart;
    },
    update: function (dt) {
        this.updateProgress(this.progress,dt);
        var str ="";
        for (let i = 0; i < this.idioms.length; i++) {
            const element = this.idioms[i];
            // cc.log(i,element.string);
            if (element.string == "") {
                return;
            }
            str += element.string;
        }
        cc.log(str,this._idiomList.length);
        for (let i = 0; i < this._idiomList.length; i++) {
            const idx = this._idiomList[i];
            cc.log("idiom ",this._idiomLib[idx]);
            if (str == this._idiomLib[idx]) {
                this._idiomList.splice(i,1);
                this.onChooseSuccess(1);
                return;
            }
        }
    }
});
