<template>
  <page-view title="仓储器材">
    <div>
      <a-card :bordered="false">
        <a-form class="ant-advanced-search-form" :form="form" inline>
          <a-row :gutter="24">
            <a-col :md="6" :sm="24">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="器材编号：">
                <a-input placeholder="请输入器材编号" v-model="inputID" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="出厂时间：">
                <a-input placeholder="请输入出厂时间" v-model="inputTime" />
              </a-form-item>
            </a-col>
            <a-col style="text-align: right">
              <a-button style="margin-right: 1rem" @click="reload()" type="primary" icon="reload">刷新</a-button>
              <a-button @click="addEquipment" type="primary" icon="plus">添加器材</a-button>
            </a-col>
          </a-row>
        </a-form>
        <br />
        <a-table :columns="columns" :dataSource="eDataShow" rowKey="id" bordered>
          <template v-for="col in ['id']" :slot="col" slot-scope="text">{{text}}</template>
          <template slot="status" slot-scope="text">
            <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
          </template>
          <template slot="price" slot-scope="text">{{"￥" + text}}</template>
          <template slot="icon" slot-scope="text">
            <div id="app">
              <div class>
                <div class="pic" @click="() => showImg(text)">
                  <a-avatar :src="text" />
                </div>
              </div>
              <vue-easy-lightbox :visible="visible" :imgs="src" @hide="handleHide"></vue-easy-lightbox>
            </div>
          </template>
        </a-table>
        <a-modal v-model="showAddForm" footer>
          <a-form title="添加器材" @submit="handleSubmit" :form="form">
            <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
              <h3>新建器材</h3>
            </a-form-item>
            <a-form-item
              label="名称"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
            >
              <a-select
                v-decorator="[
          'name',
          {rules: [{ required: true, message: '请选择器材名称' }]}
        ]"
                placeholder="请选择器材名称"
              >
                <a-select-option
                  v-for="(item,index) in this.allEquipType"
                  :key="index"
                  :value="item"
                >{{item}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="出厂日期"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
            >
              <a-date-picker
                name="productTime"
                style="width: 100%"
                format="YYYY.MM.DD"
                v-decorator="[
            'productTime',
            {rules: [{ required: true, message: '请选择出厂日期' }]}
          ]"
              />
            </a-form-item>
            <a-form-item
              label="器材型号"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
            >
              <a-input
                v-decorator="[
            'model',
            {rules: [{ required: true, message: '请输入器材型号' }]}
          ]"
                name="model"
                placeholder="输入器材型号"
              />
            </a-form-item>
            <a-form-item
              label="仓库"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
            >
              <a-select
                v-decorator="[
          'warehouse',
          {rules: [{ required: true, message: '请选择所属仓库' }]}
        ]"
                placeholder="请选择所属仓库"
              >
                <a-select-option
                  v-for="(item,index) in this.allWarehouse"
                  :key="index"
                  :value="item"
                >{{item}}</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
              <a-button htmlType="submit" type="primary">提交</a-button>
              <a-button style="margin-left: 8px" @click="cancelAddForm">取消</a-button>
            </a-form-item>
          </a-form>
        </a-modal>
      </a-card>
    </div>
  </page-view>
</template>

<script>
import { getEquipmentStoredList, getAllEquipmentType, addEquipmentStored } from '@/api/equipment'
import { getWarehouseName } from '@/api/accessory'
import { PageView } from '@/layouts'
import Fuse from 'fuse.js'
import Vue from 'vue'
import Lightbox from 'vue-easy-lightbox'
import moment from 'moment'
import ACol from 'ant-design-vue/es/grid/Col'
Vue.use(Lightbox)

function showDate(time) {
  var Times = new Array()
  Times = time.split(' ')
  date = Times[0]
  for (i = 0; i < date.length; i++) {
    if (date[i] === '-') {
      date[i] = '.'
    }
  }
}
const statusMap = {
  0: {
    status: 'success',
    text: '全新'
  },
  1: {
    status: 'error',
    text: '报废'
  }
}
const columns = [
  {
    title: '器材编号',
    dataIndex: 'id',
    align: 'center',
    width: '12%',
    scopedSlots: { customRender: 'id' },
    sorter: (a, b) => parseInt(a.id.toString().slice(2)) - parseInt(b.id.toString().slice(2))
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
    width: '10%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '图标',
    dataIndex: 'icon',
    align: 'center',
    width: '7%',
    scopedSlots: { customRender: 'icon' }
  },
  {
    title: '出厂时间',
    dataIndex: 'productTime',
    align: 'center',
    width: '18%',
    scopedSlots: { customRender: 'productTime' },
    sorter: (a, b) => a.productTime > b.productTime
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: '12%',
    filters: [
      {
        text: '全新',
        value: '0'
      },
      {
        text: '报废',
        value: '1'
      }
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '型号编号',
    dataIndex: 'model',
    align: 'center',
    width: '12%',
    scopedSlots: { customRender: 'model' }
  },
  {
    title: '价格',
    dataIndex: 'price',
    align: 'center',
    width: '8%',
    scopedSlots: { customRender: 'price' },
    sorter: (a, b) => a.price - b.price
  },
  {
    title: '所在仓库',
    dataIndex: 'warehouse',
    align: 'center',
    width: '14%',
    scopedSlots: { customRender: 'storehouse' },
    filters: [],
    onFilter: (value, record) => record.warehouse.indexOf(value) === 0
  }
]
// data
let inputID = ''
const eData = []
const eDataShow = []
export default {
  inject: ['reload'],
  name: 'EquipPreview',
  components: {
    ACol,
    PageView
  },
  data() {
    this.cacheData = eData.map(item => ({ ...item }))
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      },
      equipmentData: {
        id: '',
        name: '',
        productTime: '',
        status: '',
        model: '',
        price: '',
        count: '',
        warehouse: ''
      },
      allWarehouse: [],
      allEquipType: [],
      visible: false,
      visible2: false,
      src: '',
      eData,
      columns,
      eDataShow,
      inputID: '',
      inputTime: '',
      advanced: false,
      form: this.$form.createForm(this),
      showAddForm: false,
      newFormCount: 0,
      newFormWarehouse: ''
    }
  },
  computed: {
    emptyInput() {
      if (
        this.equipmentData.id !== '' ||
        this.equipmentData.name !== '' ||
        this.equipmentData.model !== '' ||
        this.equipmentData.price !== '' ||
        this.equipmentData.count !== '' ||
        this.equipmentData.warehouse !== ''
      ) {
        return false
      } else {
        return true
      }
    }
  },
  // watch for fuzzy search
  methods: {
    moment,
    onClickClearSelect() {
      this.equipmentData.id = ''
      this.equipmentData.name = ''
      this.equipmentData.model = ''
      this.equipmentData.price = ''
      this.equipmentData.count = ''
      this.equipmentData.warehouse = ''
    },
    onClickSubmit() {
      this.onClickClearSelect()
    },
    handleChange(value, key, column) {
      const newData = [...this.eData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.eData = newData
      }
    },
    edit(key) {
      const newData = [...this.eData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.eData = newData
      }
    },
    save(key) {
      const newData = [...this.eData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.eData = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    cancel(key) {
      const newData = [...this.eData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.eData = newData
      }
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    addEquipment() {
      this.showAddForm = true
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, value) => {
        if (!err) {
          value['productTime'] = value['productTime'].format('YYYY.MM.DD')
          addEquipmentStored(value)
            .then(response => {
              this.eData = [...response.data]
              this.eDataShow = this.eData
              this.$notification.open({
                message: '添加成功',
                description: '请继续您的操作',
                icon: <a-icon type="exclamation-circle" style="color: blue" />
              })
            })
            .catch(err => {
              this.$notification.open({
                message: '添加失败',
                description: '请查看控制台信息',
                icon: <a-icon type="exclamation-circle" style="color: #108ee9" />
              })
              console.log(err)
            })
        }
      })
      this.showAddForm = false
    },
    cancelAddForm() {
      this.showAddForm = false
    },
    showImg(text) {
      this.visible = true
      this.src = text
    },
    handleHide() {
      this.visible = false
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  },
  watch: {
    inputID(pattern) {
      if (pattern == '') {
        this.eDataShow = this.eData
      } else {
        const option = {
          keys: ['id'],
          threshold: 0.1
        }
        var fuse = new Fuse(this.eData, option)
        this.eDataShow = fuse.search(pattern)
      }
    },
    inputTime(pattern) {
      if (pattern == '') {
        this.eDataShow = this.eData
      } else {
        const option = {
          keys: ['productTime'],
          threshold: 0.1
        }
        var fuse = new Fuse(this.eData, option)
        this.eDataShow = fuse.search(pattern)
      }
    }
  },
  mounted() {
    getEquipmentStoredList().then(response => {
      this.eData = [...response.data]
      this.eDataShow = this.eData
    }),
      getWarehouseName().then(response => {
        this.allWarehouse = [...response.data]
        this.columns[7].filters = []
        for (let val of this.allWarehouse) {
          let temp = {
            text: val,
            value: val
          }
          this.columns[7].filters.push(temp)
        }
      }),
      getAllEquipmentType().then(response => {
        this.allEquipType = [...response.data]
      })
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
.button-group {
  margin-bottom: 1rem;
  .button {
    margin-left: 0.5rem;
    margin-left: 0.5rem;
  }
}
.ant-form-inline .ant-form-item {
  display: inline-block;
  margin-right: 0;
}
</style>