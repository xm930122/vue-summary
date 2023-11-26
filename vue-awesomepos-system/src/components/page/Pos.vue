<template>
    <div class="pos">
        <div>
            <el-row>
                <el-col :span="7" class="pos-order" id="order-list">
                    <el-tabs>
                        <el-tab-pane label="点餐">
                            <el-table :data="tableData" style="width: 100%">
                            <el-table-column
                                prop="goodsName"
                                width="100"
                                label="商品">
                            </el-table-column>
                            <el-table-column
                                prop="count"
                                label="交易量"
                                width="70">
                            </el-table-column>
                            <el-table-column
                                prop="price"
                                label="金额"
                                width="70">
                            </el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="100">
                                 <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                                </template>
                            </el-table-column>
                            </el-table>
                            <div class="totalDiv">
                                <small>数量：</small>
                                <strong>{{totalCount}}</strong>
                                <small>总计：</small>
                                <strong>{{totalMoney}}</strong>元

                            </div>
                            <div class="order-btn">
                                <el-button type="warning">挂单</el-button>
                                <el-button type="danger" @click="delAllGoods()">删除</el-button>
                                <el-button type="success" @click="checkout()">结账</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="挂单" >挂单</el-tab-pane>
                        <el-tab-pane label="外卖" >外卖</el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="17">
                    <div class="often-goods">
                        <div class="title">常用商品</div>
                        <div class="often-goods-list">
                            <ul>
                                <li v-for="item in oftenGoods" :key="item.goodId" @click="addOrderList(item)">
                                    <span>{{item.goodsName}}</span>
                                    <span class="o-price">￥{{item.price}}元</span>
                                </li>
                            </ul>
                        </div>
                        <div class="goods-type">
                            <el-tabs >
                                <el-tab-pane label="汉堡">
                                    <ul class='cookList'>
                                        <li v-for="item in type0Goods" :key="item.goodId" @click="addOrderList(item)">
                                            <span class="foodImg">
                                                <img :src="item.goodsImg" width="100%">
                                            </span>
                                            <span class="foodName">{{item.goodsName}}</span>
                                            <span class="foodPrice">￥{{item.price}}元</span>
                                        </li>
                                    </ul>
                                </el-tab-pane>
                                <el-tab-pane label="小食">小食</el-tab-pane>
                                <el-tab-pane label="饮料">饮料</el-tab-pane>
                                <el-tab-pane label="套餐">套餐</el-tab-pane>
                            </el-tabs>
                        </div>

                    </div>
                </el-col>
            </el-row>
        </div>    
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'pos',
    data() {
        return {
            tableData: [
            {
                goodsId: 7,
                goodsName: '大杯可乐',
                price: 8,
                count:1
            }, 
            {
                goodsId: 1,
                goodsName: '香辣鸡腿堡',
                price: 15,
                count:1
            }, 
            {
                goodsId: 19,
                goodsName: '爱心薯条',
                price: 8,
                count:1
            }, 
            {
                goodsId: 18,
                goodsName: '甜筒',
                price: 8,
                count:1
            }],
            oftenGoods:[],
            type0Goods:[],
            totalMoney: 39, //订单总价格
            totalCount: 4  //订单商品总数量
        }
    },
    methods: {
        delSingleGoods(item) {
            this.tableData = this.tableData.filter( i => i.goodsId !== item.goodsId)
            this.getAllMoney()
        },
        delAllGoods() {
            this.tableData = [];
            this.getAllMoney()
        },
        addOrderList(item) {
            this.totalMoney = 0
            this.totalCount = 0
            let isHave = false
            for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].goodsId === item.goodsId) {
                    isHave = true
                }
            }
            if (isHave) {
                let arr = this.tableData.filter( i => i.goodsId === item.goodsId)
                arr[0].count++
            } else {
                let newGoods = {
                    goodsId: item.goodsId,
                    goodsName: item.goodsName,
                    price: item.price,
                    count:1
                }
                this.tableData.push(newGoods)
            }
            this.getAllMoney()
        },
        getAllMoney() {
            this.totalCount = 0;
            this.totalMoney = 0;
            if (this.tableData) {
                this.tableData.forEach((element) => {
                this.totalCount += element.count;
                this.totalMoney += element.count*element.price
            })}
        },
        checkout() {
            if (this.totalCount !== 0) {
                this.tableData = [];
                this.totalCount = 0;
                this.totalMoney = 0;
                this.$message({
                    message: '结账成功，感谢你又为店里出了一份力!',
                    type: 'success'
                });
            } else {
                this.$message.error('不能空结。老板了解你急切的心情！');
            }
        }
    },
    created() {
        axios.get('/index/oftenGoods')
            .then(response => {
                this.oftenGoods = response.data.oftenGoods;
            })
            .catch(error => {
                console.log(error);
                alert('网络错误，不能访问');
            })

            axios.get('/index/type0Goods')
            .then(response => {
                this.type0Goods = response.data.type0Goods;
            })
            .catch(error => {
                console.log(error);
                alert('网络错误，不能访问');
            })
        
    },
    mounted() {
        var orderHeight = document.body.clientHeight;
        document.getElementById("order-list").style.height = orderHeight+'px';
    }  
}
</script>

<style scoped>
.pos {
    font-size: 12px;
}

.pos-order {

    background-color: #F9FAFC;
    border-right: 1px solid #C0CCDA;
}

.order-btn {
    margin-top: 10px;
    text-align: center;
}

.title {
    height: 20px;
    border-bottom: 1px solid #D3DCE6;
    background-color: #F9FAFC;
    padding: 10px;
}

.often-goods-list ul li {
    list-style: none;
    float: left;
    border: 1px solid #E5E9F2;
    padding: 10px;
    margin: 5px;
    background-color: #fff;
    cursor: pointer;
}

.goods-type {
    clear: both;
}

.o-price {
    color: #58B7FF;
}

.often-goods-list {
    border-bottom: 1px solid #C0CCDA;
    height: auto;
    overflow: hidden;
    padding-bottom: 10px;
    background-color: #F9FAFC;
}

.cookList li {
    list-style: none;
    width: 23%;
    border: 1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin: 2px;
    cursor: pointer;
}

.cookList li span {

    display: block;
    float: left;
}

.foodImg {
    width: 40%;
    height: 50px;
}

.foodName {
    font-size: 18px;
    padding-left: 10px;
    color: brown;
}

.foodPrice {
    font-size: 16px;
    padding-left: 10px;
    padding-top: 10px;
}

.totalDiv {
    height: auot;
    overflow: hidden;
    text-align: right;
    font-size: 16px;
    background-color: #fff;
    border-bottom: 1px solid #E5E9F2;
    padding: 10px;
}
    
</style>