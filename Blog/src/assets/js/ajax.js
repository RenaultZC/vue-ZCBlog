var ajax = function () {

  //默认请求参数
  var _options = {
    url: null,
    type: 'GET',
    data: null,
    dataType: 'text',
    jsonp: 'callback',
    jsonpCallback: 'jsonpCallback',
    async: true,
    cache: true,
    timeout:null,
    contentType: 'application/x-www-form-urlencoded',
    success: null,
    fail: null
  }


  // json转化为字符串
  var _param = function(data) {
    var str = '';
    if( !data || _empty(data)) {
      return str;
    }
    for(var key in data) {
      str += key + '='+ data[key]+'&'
    }
    str = str.slice(0,-1);
    return str;
  }
  //判断对象是否为空
  var _empty = function(obj) {
    for(var key in obj) {
      return false;
    }
    return true;
  }

  var _extend = function(target,options) {
    if( typeof target !== 'object' || typeof options !== 'object' ) {
      return;
    }
    var copy ,clone, name;
    for( name in options ) {
      if(options.hasOwnProperty(name) && !target.hasOwnProperty(name)) {
        target[name] = options[name];
      }
    }
    return target;
  };

  // 自定义text转化json格式
  var parseJSON = function(text) {
    if(typeof text !== 'string') {
      return;
    }
    if( JSON && JSON.parse ) {
      return JSON.parse(text);
    }
    return (new Function('return '+text))();
  }

  // jsonp处理函数
  function _sendJsonpRequest(url,callbackName,succCallback) {

    var script = document.createElement('script');

    script.type="text/javascript";
    script.src=url;

    document.body.appendChild(script);
    // 如果用户自己定义了回调函数，就用自己定义的，否则，调用success函数
    window[callbackName] = window[callbackName] || succCallback;

  }


  return function (options) {

    // 没有传参或者没有url，抛出错误
    if( !options || !options.url ) {
      throw('参数错误！');
    }

    // 继承操作
    options.type = options.type.toUpperCase();
    _extend(options,_options);

    /*jsonp部分，直接返回*/
    if( options.dataType === 'jsonp' ) {
      var jsonpUrl = options.url.indexOf('?') > -1 ? options.url: options.url +
        '?' + options.jsonp+ '=' + options.jsonpCallback;

      _sendJsonpRequest(jsonpUrl,options.jsonpCallback,options.success);

      return;
    }

    //XMLHttpRequest传参无影响
    var xhr = new (window.XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');

    // get搜索字符串
    var search = '';

    // 将data序列化
    var param= _param(options.data)

    if( options.type === 'GET' ) {
      search = (options.url.indexOf('?') > -1 ? '&' : '?') + param;
      if(!options.cache) {
        search += '&radom='+Math.random();
      }

      param = null;
    }
    xhr.withCredentials = true;
    xhr.open( options.type, options.url + search, options.async );

    xhr.onreadystatechange = function() {
      if( xhr.readyState == 4 ) {
        if( xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 ) {
          var text = xhr.responseText;
          // json格式转换
          if(options.dataType == 'json') {
            text = parseJSON(text)
          }

          if( typeof options.success === 'function') {

            options.success(text,xhr.status)
          }

        }else {

          if(typeof options.fail === 'function') {
            options.fail('获取失败', 500)
          }

        }
      }
    }

    xhr.setRequestHeader('content-type',options.contentType);
    // get请求时param时null
    xhr.send(param);

    // 如果设置了超时，就定义
    if(typeof options.timeout === 'number') {
      // ie9+
      if( xhr.timeout ) {
        xhr.timeout = options.timeout;
      }else {
        setTimeout(function() {
          xhr.abort();
        },options.timeout)
      }
    }
  }

}();
export default ajax;
