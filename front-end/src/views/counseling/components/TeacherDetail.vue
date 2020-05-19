<template>
  <page-view :avatar="headPortrait" title="老师信息">
     <detail-list slot="headerContent" size="small" :col="1" class="detail-layout">
        <detail-list-item term="老师姓名">{{name}}</detail-list-item>
        <detail-list-item term="详细描述">{{introduction}}</detail-list-item>
        <detail-list-item term="咨询地址">{{address}}</detail-list-item>
      </detail-list>
    <a-card style="margin-top:20px">
      <a-row :gutter="16">
        <a-col :span="8"><h2>选择预约时间（只能预约本周）</h2></a-col>
        <a-col :span="8">
          <a-button
            style="margin-right : 1rem"
            @click="reserve()"
            type="primary"
          >确定预约
          </a-button>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-card>
          <a-col :span="2">
            </br></br>
            <a-row>
              <p>10:00~11:00</P>
            </a-row>
            <a-row>
              <p>11:00~12:00</P>
            </a-row>
            <a-row>
              <p>14:00~15:00</P>
            </a-row>
            <a-row>
              <p>15:00~16:00</P>
            </a-row>
          </a-col>
          <a-col :span="10">
            <div>
              <a-row><a-col :span="2">一</a-col><a-col :span="2">二</a-col><a-col :span="2">三</a-col><a-col :span="2">四</a-col><a-col :span="2">五</a-col></p></a-row>
              </br>
              <a-radio-group @change="onChange"  buttonStyle="solid" style="margin-left:10px">
                <a-row>
                  <a-radio-button value="1" :disabled="disabled1"></a-radio-button>
                  <a-radio-button value="2" :disabled="disabled2"></a-radio-button>
                  <a-radio-button value="3" :disabled="disabled3"></a-radio-button>
                  <a-radio-button value="4" :disabled="disabled4"></a-radio-button>
                  <a-radio-button value="5" :disabled="disabled5"></a-radio-button>
                </a-row>
                <a-row>
                  <a-radio-button value="6" :disabled="disabled6"></a-radio-button>
                  <a-radio-button value="7" :disabled="disabled7"></a-radio-button>
                  <a-radio-button value="8" :disabled="disabled8"></a-radio-button>
                  <a-radio-button value="9" :disabled="disabled9"></a-radio-button>
                  <a-radio-button value="10" :disabled="disabled10"></a-radio-button>
                </a-row>
                <a-row>
                  <a-radio-button value="11" :disabled="disabled11"></a-radio-button>
                  <a-radio-button value="12" :disabled="disabled12"></a-radio-button>
                  <a-radio-button value="13" :disabled="disabled13"></a-radio-button>
                  <a-radio-button value="14" :disabled="disabled14"></a-radio-button>
                  <a-radio-button value="15" :disabled="disabled15"></a-radio-button>
                </a-row>
                <a-row>
                  <a-radio-button value="16" :disabled="disabled16"></a-radio-button>
                  <a-radio-button value="17" :disabled="disabled17"></a-radio-button>
                  <a-radio-button value="18" :disabled="disabled18"></a-radio-button>
                  <a-radio-button value="19" :disabled="disabled19"></a-radio-button>
                  <a-radio-button value="20" :disabled="disabled20"></a-radio-button>
                </a-row>
              </a-radio-group>
            </div>
          </a-col>
        </a-card>
      </a-row>
    </a-card>
  </page-view>

</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import {postTeacherDetail} from '@/api/teacher'
import {chooseTime} from '@/api/counseling'
import ACol from "ant-design-vue/es/grid/Col";
import {mapGetters} from 'vuex'

const DetailListItem = DetailList.Item

export default {
  inject: ['reload'],
  created(){

  },
  name: 'teacherDetail',
  components: {
     ACol,
     PageView,
     DetailList,
     DetailListItem
  },
  data () {
    return {
      teacherID:this.$route.params.id,
      TimeData:[],
      TeacherData:[],
      day:'',
      period:'',
      headerPortrait:'',
      name:'',
      introduction:'',
      address:'',
      disabled1:false,disabled2:false,disabled3:false,disabled4:false,disabled5:false,disabled6:false,disabled7:false,disabled8:false,disabled9:false,disabled10:false,
      disabled11:false,disabled12:false,disabled13:false,disabled14:false,disabled15:false,disabled16:false,disabled17:false,disabled18:false,disabled19:false,disabled20:false,
        time:{
          teacher:this.$route.params.id,
          weekday : '',
          period:'',
        },

      chooseInfo:'',
    }
  },
  methods: {
      onChange(e) {
          console.log('radio checked', e.target.value);
          this.day=(e.target.value)%5;
          this.period=parseInt((e.target.value-1)/5)+1;
          console.log(parseInt((e.target.value-1)/5));
          console.log((e.target.value)%5);
          if(this.day==0){
              this.time.weekday=this.day+5;
          }else{
              this.time.weekday=this.day;
          }
          this.time.period=this.period;
          console.log(this.time);
      },
      reserve(){
        chooseTime(this.time).then((response)=>{
          this.chooseInfo=response.code
          if(this.chooseInfo === 200){
          this.$notification.open({
          message: '预约成功',
          description: '预约成功',
          icon: <a-icon type="check" style="color: #108ee9" />,
        });}
        else{
          this.$notification.open({
          message: '预约失败',
          description: '预约失败',
          icon: <a-icon type="warning" style="color: #108ee9" />,
        });
        }
       })
       this.reload()
     }
  },
  mounted(){
      console.log(this.teacherID)
      postTeacherDetail({id:this.teacherID}).then((response)=>{
        let teacher=response.data.teacher;
        let schedule=response.data.schedule;
        this.headPortrait=teacher.headPortrait;
        this.name=teacher.name;
        this.introduction=teacher.introduction;
        this.address=teacher.address;
        this.TimeData=schedule;
        console.log(schedule)
          let i=0;
          for(i;i<this.TimeData.length;i++)
          {
              console.log(this.TimeData[i])
              console.log(this.TimeData[i].day+(this.TimeData[i].timePeriod-1)*5)
              let t = this.TimeData[i].day+(this.TimeData[i].timePeriod-1)*5
              console.log(t)
              switch(t){
                  case 1:this.disabled1=true;break;
                  case 2:this.disabled2=true;break;
                  case 3:this.disabled3=true;break;
                  case 4:this.disabled4=true;break;
                  case 5:this.disabled5=true;break;
                  case 6:this.disabled6=true;break;
                  case 7:this.disabled7=true;break;
                  case 8:this.disabled8=true;break;
                  case 9:this.disabled9=true;break;
                  case 10:this.disabled10=true;break;
                  case 11:this.disabled11=true;break;
                  case 12:this.disabled12=true;break;
                  case 13:this.disabled13=true;break;
                  case 14:this.disabled14=true;break;
                  case 15:this.disabled15=true;break;
                  case 16:this.disabled16=true;break;
                  case 17:this.disabled17=true;break;
                  case 18:this.disabled18=true;break;
                  case 19:this.disabled19=true;break;
                  case 20:this.disabled20=true;break;
                  default:
              }
          }
      })

  }
}

</script>

<style lang="less" scoped>

  .detail-layout {
    margin-left: 44px;
  }
  .text {
    color: rgba(0, 0, 0, .45);
  }

  .heading {
    color: rgba(0, 0, 0, .85);
    font-size: 20px;
  }

  .no-data {
    color: rgba(0, 0, 0, .25);
    text-align: center;
    line-height: 64px;
    font-size: 16px;

    i {
      font-size: 24px;
      margin-right: 16px;
      position: relative;
      top: 3px;
    }
  }

  .photo {
      align: center;
  }

  .mobile {
    .detail-layout {
      margin-left: unset;
    }
    .text {

    }
    .status-list {
      text-align: left;
    }
  }
</style>