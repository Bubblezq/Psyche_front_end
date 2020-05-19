<template>
  <a-row :gutter="24">
    <a-col :xl="7" :lg="7" :md="7" :sm="7" :xs="7">
      <!--返回测试列表-->
      <div class="return-button">
        <router-link :to="{name: 'TestList'}">
          <a-button type="primary">
            <a-icon type="left"/>
            返回测试首页
          </a-button>
        </router-link>
      </div>

    </a-col>
    <a-col :xl="10" :lg="10" :md="10" :sm="10" :xs="10">
      <br><br>
      <!--测试-->
      <a-card :body-style="{padding: '48px 0px'}" :bordered="false">
        <!--当题号不为0时显示题目-->
        <div v-if="this.questionId!==0">
        <a-form style="text-align: center">
          <h2>
            <strong>
              第 {{ questionId }} 题：{{ question }}
            </strong>
          </h2><br>
          <a-form-item label="">
            <a-radio-group name="radiobox" style="text-align: left" @change="onChange" v-model="vcheck">
              <a-radio :style="radioStyle" value="1">
                {{ choiceA }}
              </a-radio>
              <a-radio :style="radioStyle" value="2">
                {{ choiceB }}
              </a-radio>
              <a-radio :style="radioStyle" value="3">
                {{ choiceC }}
              </a-radio>

            </a-radio-group>
          </a-form-item>

          <br>
          <a-form-item
            :wrapperCol="{ span: 24 }"
            style="text-align: center"
          >
            <a-button @click="nextQuest" htmlType="submit" type="primary">
              下一题
            </a-button>
          </a-form-item>
        </a-form>
        <p style="text-align: center">*测试*</p>
        </div>
        <!--当题号为0时显示结果-->
        <div v-else style="text-align: center">
          <h2><strong>
            <a-icon type="radar-chart"/>
            {{ title }}测试结果
          </strong></h2>
          <br>
          <a-card border="true" style="margin: 0 15px 0 15px">
            {{ result }}
          </a-card>

        </div>

      </a-card>

    </a-col>
  </a-row>

</template>

<script>

  import {getTestDetail} from '../../api/psytest'


  export default {
    inject: ['reload'],
    name: 'TestDetail',
    data() {
      return {

        radioStyle: {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        },

        testId: this.$route.params.id,
        title:this.$route.params.title,
        questionId: 0,
        choiceId: 0,

        question: '加载中…',
        choiceA: '加载中…',
        choiceB: '加载中…',
        choiceC: '加载中…',

        result:'测试结果',

          vcheck:0,


      }
    },


    mounted() {
        this.getDetail();
      console.log('mounted+choiceId',this.choiceId);
/*
      this.reload();
*/

    },

    methods: {

      onChange(e) {
        console.log(`checked = ${e.target.value}`);
        console.log('选项点击成功');
        this.choiceId = (`${e.target.value}`);
        console.log(this.choiceId)
      },

      nextQuest() {
          if (this.vcheck){
              this.getDetail();
              this.vcheck=0;
          }
          /*
                  this.reload();
          */

      },

      getDetail() {
        getTestDetail({"testId":this.testId,"qId":this.questionId,"choiceId":this.choiceId}).then(response => {
            console.log('初始化成功', response.data)

            this.data = response.data

            let dd=this.data
            console.log('初始化成功1'+ dd.questionId)


            this.questionId = this.data.id
            this.question = this.data.question
            this.choiceA = this.data.choiceA
            this.choiceB = this.data.choiceB
            this.choiceC = this.data.choiceC
            this.result=this.data.result



            console.log('显示data:', this.data)
        })
      }

    }
  }
</script>
