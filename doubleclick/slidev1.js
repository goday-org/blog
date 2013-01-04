var slidePageId;
var bottomId;
var isSlidePanelInit = false;
var $j = jQuery.noConflict();
var packageBodyToDiv = function (id) {
    var _body = document.body;
    _div = document.createElement('div');
    _div.id = id;
    _div.style.zoom = '1';
    if (document.createRange) {
        var rangeObj = document.createRange();
        rangeObj.selectNodeContents(_body);
        rangeObj.surroundContents(_div);
    } 
    else {
        if (_body.applyElement) {
            _body.applyElement(_div, 'inside');
        } 
        else {
            // last solution, using appendChild
            var _child;
            _body.parentNode.removeChild(_body); // avoid page reflow
            while (_child = _body.firstChild) {
                _div.appendChild(_child);
            }
            _body.appendChild(_div);
            document.documentElement.appendChild(_body); 
        }
    }
}

window.onload = function()
{
	packageBodyToDiv("moveCon");
	packageBodyToDiv("mainCon");

	document.getElementById("mainCon").style.cssText = "background-color: white; position:relative; overflow: hidden; width:980px; margin:auto;";
	document.getElementById("moveCon").style.position = "relative";
	
}

function setBottom()
{
	if(core.getIEVersion() == 6)
	{
		document.getElementById(bottomId).style.cssText = "bottom:auto; margin-left:-490px;z-index:1000000; position: absolute;  top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop, 10)||0)-(parseInt(this.currentStyle.marginBottom, 10)||0)));"
	}
	else
	{
		document.getElementById(bottomId).style.cssText = "position: fixed !important;z-index:1000000;overflow: hidden; bottom: 0;left:50%;margin-left:-490px";
	}
}

function setSlidePanel()
{
	if(isSlidePanelInit)
	{
		return;
	}
	document.getElementById(slidePageId).style.cssText = "position:absolute;top: 20px;left: 980px; display: block !important";
	isSlidePanelInit = true;
}

function slideTo()
{
	scroll(0, 0);
	$j("#moveCon").animate({left: -980},2000,function(){$j("#" + bottomId).animate({height: 0},1000);});	
}

function slideBack()
{
	$j("#moveCon").animate({left: 0},2000,function(){$j("#" + bottomId).animate({height: 90},1000);});	
}

function updateBottomId(id)
{
	bottomId = "DIV_" + id;
	setBottom();
}

function updateSlideId(id)
{
	slidePageId = "DIV_" + id;
	setSlidePanel();
	
}