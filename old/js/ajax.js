function ajax(option){
    var url = option.url
    if(!url){
        console.error('请求路径必须传入')
        return;
    }
    var method = (option.method||'get').toLowerCase();
    var data = option.data || {};
    var params = "";
    for(var key in data){
        params += key + "=" + data[key] + "&"
    }
    params = params.slice(0,-1);
    var success = option.success;
    var error = option.error;
    var dataType = (option.dataType||'json').toLowerCase();
    var jsonp = option.jsonp||'callback';
    var cb = option.cb||('phone'+new Date().getTime()+Math.random().toString().slice(2));
    if(dataType=="json"){
        var xhr = new XMLHttpRequest;
        if(method=="get"){
			xhr.open('get',url+"?"+params);
			xhr.send(null)
		}
		if(method=="post"){
			xhr.open('post',url);
			xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
			xhr.send(params)
		}
		xhr.onreadystatechange = function(){
			if(xhr.readyState==4){
				if(xhr.status==200){					
					success(xhr.response);
				}else{
					if(error){
						error();
					}
				}
			}
		}
	}
	var script = document.createElement('script');
	script.src =url+"?"+params+"&"+jsonp+"="+cb;								
	window[cb] = function(data){
		success(data);
		script.remove()
	}
	document.body.appendChild(script);       
}
