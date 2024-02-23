var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/*
FuckAdBlock 3.0.2
http://github.com/sitexw/FuckAdBlock
*/

(function(window) {
	if(window.fuckAdBlock !== undefined) {
		return;
	}
	
	var FuckAdBlock = function(options) {
		if(options !== undefined) {
			this.setOption(options);
		}
		
		var self = this;
		var eventCallback = function() {
			setTimeout(function() {
				if(self._options.checkOnLoad === true) {
					if(self._var.bait === null) {
						self._creatBait();
					}
					setTimeout(function() {
						self.check();
					}, 1);
				}
			}, 1);
		};
		if(window.addEventListener) {
			window.addEventListener('load', eventCallback, false);
		} else {
			window.attachEvent('onload', eventCallback);
		}
	};
	FuckAdBlock.prototype._options = {
		checkOnLoad:		true,
		resetOnEnd:			true,
		loopCheckTime:		50,
		loopMaxNumber:		5,
		baitClass:			'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links',
		baitStyle:			'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;'
	};
	FuckAdBlock.prototype._var = {
		version:			'3.0.1',
		bait:				null,
		checking:			false,
		loop:				null,
		loopNumber:			0,
		event:				{
								detected:		[],
								notDetected:	[]
							}
	};
	FuckAdBlock.prototype._bait = null;
	
	FuckAdBlock.prototype.setOption = function(options, value) {
		if(value !== undefined) {
			var key = options;
			options = {};
			options[key] = value;
		}
		for(option in options) {
			this._options[option] = options[option];
		}
		return this;
	};
	
	FuckAdBlock.prototype._creatBait = function() {
		var bait = document.createElement('div');
			bait.setAttribute('class', this._options.baitClass);
			bait.setAttribute('style', this._options.baitStyle);
		this._var.bait = window.document.body.appendChild(bait);
		
		this._var.bait.offsetParent;
		this._var.bait.offsetHeight;
		this._var.bait.offsetLeft;
		this._var.bait.offsetTop;
		this._var.bait.offsetWidth;
		this._var.bait.clientHeight;
		this._var.bait.clientWidth;
	};
	FuckAdBlock.prototype._destroyBait = function() {
		window.document.body.removeChild(this._var.bait);
		this._var.bait = null;
	};
	
	FuckAdBlock.prototype.check = function(loop) {
		if(loop === undefined) {
			loop = true;
		}
		
		if(this._var.checking === true) {
			return false;
		}
		this._var.checking = true;
		
		if(this._var.bait === null) {
			this._creatBait();
		}
		
		var self = this;
		this._var.loopNumber = 0;
		if(loop === true) {
			this._var.loop = setInterval(function() {
				self._checkBait(loop);
			}, this._options.loopCheckTime);
		}
		this._checkBait(loop);
		
		return true;
	};
	FuckAdBlock.prototype._checkBait = function(loop) {
		var detected = false;
		
		if(this._var.bait === null) {
			this._creatBait();
		}
		
		if(window.document.body.getAttribute('abp') !== null
		|| this._var.bait.offsetParent === null
		|| this._var.bait.offsetHeight == 0
		|| this._var.bait.offsetLeft == 0
		|| this._var.bait.offsetTop == 0
		|| this._var.bait.offsetWidth == 0
		|| this._var.bait.clientHeight == 0
		|| this._var.bait.clientWidth == 0) {
			detected = true;
		}
		if(window.getComputedStyle !== undefined) {
			var baitTemp = window.getComputedStyle(this._var.bait, null);
			if(baitTemp.getPropertyValue('display') == 'none'
			|| baitTemp.getPropertyValue('visibility') == 'hidden') {
				detected = true;
			}
		}
		
		if(loop === true) {
			this._var.loopNumber++;
			if(this._var.loopNumber >= this._options.loopMaxNumber) {
				clearInterval(this._var.loop);
				this._var.loop = null;
				this._var.loopNumber = 0;
			}
		}
		
		if(detected === true) {
			if(loop === true) {
				this._var.checking = false;
			}
			this._destroyBait();
			this.emitEvent(true);
		} else if(this._var.loop === null || loop === false) {
			if(loop === true) {
				this._var.checking = false;
			}
			this._destroyBait();
			this.emitEvent(false);
		}
	};
	
	FuckAdBlock.prototype.emitEvent = function(detected) {
		var fns = this._var.event[(detected===true?'detected':'notDetected')];
		for(i in fns) {
			fns[i]();
		}
		if(this._options.resetOnEnd === true) {
			this.clearEvent();
		}
		return this;
	};
	FuckAdBlock.prototype.clearEvent = function() {
		this._var.event.detected = [];
		this._var.event.notDetected = [];
	};
	
	FuckAdBlock.prototype.on = function(detected, fn) {
		this._var.event[(detected===true?'detected':'notDetected')].push(fn);
		return this;
	};
	FuckAdBlock.prototype.onDetected = function(fn) {
		return this.on(true, fn);
	};
	FuckAdBlock.prototype.onNotDetected = function(fn) {
		return this.on(false, fn);
	};
	
	window.fuckAdBlock = new FuckAdBlock();
})(window);

}
/*
     FILE ARCHIVED ON 01:19:21 Jul 05, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:09:53 Feb 22, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots: 0.072
  exclusion.robots.policy: 0.06
  cdx.remote: 0.104
  esindex: 0.013
  LoadShardBlock: 483.585 (6)
  PetaboxLoader3.datanode: 253.592 (7)
  load_resource: 187.318
  PetaboxLoader3.resolve: 149.075
*/