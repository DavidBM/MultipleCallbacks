function MultipleCallbacks (timesToFire, callback) {

	if (!(this instanceof MultipleCallbacks)) return new MultipleCallbacks(timesToFire, callback);

	this.firedTimes = 0;
	this.timesToFire = timesToFire;
	this.callback = callback;

	var preCallback = this.createPreCallback();

	var isNumber = typeof timesToFire == 'number';

	if( isNumber && timesToFire <= 0) preCallback();

	return preCallback;
}

module.exports = exports = MultipleCallbacks;

MultipleCallbacks.prototype.setTimesToFire = function(timesToFire) {

	this.timesToFire = timesToFire;

	if(this.firedTimes >= this.timesToFire) this._preCallback();

	return timesToFire;
};

MultipleCallbacks.prototype.getTimesToFire = function() {
	return this.timesToFire;
};

MultipleCallbacks.prototype.getFiredTimes = function() {
	return this.firedTimes;
};

MultipleCallbacks.prototype.sumTimesToFire = function(quantity) {
	var timesToFire = this.timesToFire + quantity;

	this.setTimesToFire(timesToFire);
};

MultipleCallbacks.prototype._preCallback = function() {

	if(this.timesToFire === false) return;

	this.firedTimes++;

	if(this.firedTimes >= this.timesToFire && this.callback){
		this.callback();
	}
	return this.timesToFire - this.firedTimes;
};

MultipleCallbacks.prototype.createPreCallback = function() {

	var _this = this;

	function preCallback (){
		return _this._preCallback();
	}

	preCallback.setTimesToFire = function(timesToFire){
		return _this.setTimesToFire(timesToFire);
	};

	preCallback.getTimesToFire = function(){
		return _this.getTimesToFire();
	};

	preCallback.getFiredTimes = function(){
		return _this.getFiredTimes();
	};

	preCallback.sumTimesToFire = function(quantity){
		return _this.sumTimesToFire(quantity);
	};

	return preCallback;
};
