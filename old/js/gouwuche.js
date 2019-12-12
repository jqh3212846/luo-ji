(function(){

    var products = [
        {
        id:32145,
        name:"罗技 WONDERBOOM无线蓝牙音箱 牛油果绿",
        price:799,
        pic:"https://images.wincheers.net/UpLoad/logitech/xx/nyg-wonderboom-01.png"
        },
        {
        id:53215,
        name:"罗技 WONDERBOOM无线蓝牙音箱 混凝土黑",
        price:799,
        pic:"https://images.wincheers.net/UpLoad/logitech/xx/hnt-wonderboom-01.png"   
        },
        {
        id:78542,
        name:"罗技 G502 LIGHTSPEED 创世者无线游戏鼠标",
        price:899,
        pic:"https://images.wincheers.net/UpLoad/Web/ProductImg/2019-05-29/NEW_XL/G502wx.png"   
        },
        {
        id:79462,
        name:"罗技 G903 LIGHTSPEED 无线游戏鼠标  新一代HERO传感器",
        price:799,
        pic:"https://images.wincheers.net/UpLoad/Web/ProductImg/2019-02-14/NEW_XL/G903-01.png"   
        },
        {
        id:97162,
        name:"罗技 G610背光机械游戏键盘 青轴",
        price:549,
        pic:"https://images.wincheers.net/UpLoad/Web/ProductImg/2019-04-19/NEW_XL/G610-01.png"   
        },
        {
        id:97403,
        name:"罗技 G813 RGB 机械游戏键盘 (GL-Tactile)",
        price:1099,
        pic:"https://images.wincheers.net/UpLoad/Web/ProductImg/2019-08-28/NEW_XL/g813.png"   
        },
        {
        id:65785,
        name:"罗技 Zone Wireless无线蓝牙耳机",
        price:2499,
        pic:"https://images.wincheers.net/UpLoad/Web/ProductImg/2019-09-04/NEW_XL/zone-5.png"   
        },
        {
        id:48792,
        name:"罗技 G431 7.1环绕声游戏耳机麦克风",
        price:549,
        pic:"https://images.wincheers.net/UpLoad/Web/ProductImg/2019-04-11/NEW_XL/g43103.png"   
        }
    ]

    class ShoppingCart{
        constructor(containerId,products){
            this.container = document.getElementById(containerId);
            this.shopList = document.createElement('table');
            this.cartList = document.createElement('table');
            this.products = products;
            this.cartProducts = this.getStorage()||[];
            this.container.appendChild(this.shopList);
			this.container.appendChild(this.cartList);
        }
        setStorage(json){
            localStorage.setItem('cart',JSON.stringify(json))
        }
        getStorage(){
            return JSON.parse(localStorage.getItem('cart'))||[]
        }
        init(){
            this.initShopList();
            if(this.getStorage().length>0){
                this.renderCartList()
            }
        }
        initShopList(){
            var str = `<thead>
                        <tr>
                            <th>商品ID</th>
                            <th>商品名称</th>
                            <th>商品价格</th>
                            <th>商品图片</th>
                            <th>操作</th>
                        </tr>
                       </thead>`;
            str += "<tbody>"
            this.products.forEach((value)=>{
                str += `<tr>
                            <td>${value.id}</td>
                            <td>${value.name}</td>
                            <td>${value.price}</td>
                            <td><img src="${value.pic}"></td>
                            <td><a href="javascript:;" class="addCart">加入购物车</td>
                        </tr>`
            })
            str + "</tbody>";
            this.shopList.innerHTML = str;
            this.addCartListEvent()
        }
        addCartListEvent(){
            var that = this;
            var addCartBtnArr = this.container.querySelectorAll('.addCart');
            addCartBtnArr.forEach((addCartBtn)=>{
                addCartBtn.onclick = function(){
                    var tr = this.parentNode.parentNode;
                    var currentProduct = {
                        name:tr.children[1].innerHTML,
                        price:tr.children[2].innerHTML,
                        pic:tr.children[3].innerHTML,
                        id:tr.children[0].innerHTML,
                    }
                    that.addToCartProducts(currentProduct);
                    that.renderCartList();
                }
            })
        }
        addToCartProducts(currentProduct){
            this.cartProducts = this.getStorage();
            for(var i=0;i<this.cartProducts.length;i++){
                if(this.cartProducts[i].id==currentProduct.id){
                    this.cartProducts[i].num++;
                    this.setStorage(this.cartProducts);
                    return;
                }
            }
            currentProduct.num = 1;
            this.cartProducts.push(currentProduct);
            this.setStorage(this.cartProducts)
        }
        renderCartList(){
            var str = `<thead>
                        <tr>
                            <th>商品ID</th>
                            <th>商品名称</th>
                            <th>商品价格</th>
                            <th>商品图片</th>
                            <th>商品数量</th>
                            <th>操作</th>
                        </tr>
                      </thead>`;
            str += '<tbody>'
            this.getStorage().forEach((product)=>{
                str += `<tr>
                        <td>${product.id}</td> 
                        <td>${product.name}</td> 
                        <td>${product.price}</td> 
                        <td>
                            ${product.pic}
                        </td> 
                        <td class="change">
                            <span class="jian">-</span>
                            ${product.num}
                            <span class="jia">+</span>
                        </td> 
                        <td><a href="javascript:;" class="del">删除</a></td> 
                        </tr>`
            });
            str += "</tbody>"
            this.cartList.innerHTML = str;
            this.deleteProductEvent()
            this.changeNwmEvet();
        }
            changeNwmEvet(){
                var that = this;
                var changeNumTdArr = this.container.querySelectorAll('.change')
                changeNumTdArr.forEach((changeNumTd)=>{
                    changeNumTd.onclick = function(e){
                        var target = e.target;
                        var id = this.parentNode.children[0].innerHTML;
                        if(e.target.className == 'jian'){
                            that.jianNum(id)
                        }
                        if(e.target.className == 'jia'){
                            that.jiaNum(id);
                            that.renderCartList();
                        }
                    }
                })
            }
            jianNum(id){
                var arr = this.getStorage();
                for(var i=0;i<arr.length;i++){
                    if(arr[i].id==id){
                        arr[i].num--;
                        this.setStorage(arr);
                        this.renderCartList();
                        if(arr[i].num<=0){
                            this.deleteFromCartProducts(id);
                            return;
                        }
                        return;
                    }
                }
            }
            jiaNum(id){
                var arr = this.getStorage();
                for(var i=0;i<arr.length;i++){
                    if(arr[i].id==id){
                        arr[i].num++;
                        this.setStorage(arr);
                        return;
            }
        }
    }
    deleteProductEvent(){
        var that = this;
        var delBtnArr = this.container.querySelectorAll('.del');
        delBtnArr.forEach((delBtn)=>{
            delBtn.onclick = function(){   
            var id = this.parentNode.parentNode.children[0].innerHTML;
            that.deleteFromCartProducts(id);
            }  
        })
    }
    deleteFromCartProducts(id){
        this.cartProducts = this.getStorage();
        this.cartProducts = this.cartProducts.filter((product)=>{
            if(product.id==id){
                return false
            }else{
                return true;
            }
        });
        this.setStorage(this.cartProducts);
        this.renderCartList();
        if(this.getStorage().length<1){
            this.cartList.innerHTML = "";
        }
    }
}


var car = new ShoppingCart('container',products)
car.init()
})()
