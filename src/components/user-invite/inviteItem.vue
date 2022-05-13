<template>
  <div>
    <search :data="filters" @search="doSearch" :hasDefaultDate="false">
      <g-form-item>
        <g-button @click="initAdd">添加</g-button>
      </g-form-item>
    </search>
    <g-table :columns="columns" :data="listData.data" :loading="listLoading" :pagination="{ current: searchForm.page, pageSize: searchForm.pageSize, total: listData.total }" @pagination-change="onPageChange">
      <template #nickname="{ record }">
        <link-account :uuid="record.account_uuid" :nickname="record.nickname" />
      </template>
      <template #avatar="{ record }">
        <g-image :src="domain + record.avatar" :previewSrcList="[domain + record.avatar]" :width="100" :height="100" />
      </template>
      <template #create_time="{ record }">
        {{ filterStamp(record.create_time) }}
      </template>
      <template #actions="{ record }">
        <g-button type="link" :disabled="record.status == 0 ? true : false" @click="onDelete(record.id)">详情</g-button>
      </template>
    </g-table>
    <invite-detail v-if="inviteVis" @change="inviteVis = false" />
  </div>
</template>

<script setup lang="ts">
import search from '@/components/search.vue'
import { reactive, ref, onBeforeMount } from 'vue'
import { PreviewData } from '@/api/common'
import ajax from '@/utils/ajax'
import { review } from '@/api/operateConfig/reviewPerson'
import { message } from 'ginv'
import { filterStamp } from '@/utils/filters'
import { moduleConfig } from '@/config'

import inviteDetail from './components/inviteDetail.vue'
interface FormData {
  account_uuid?: string
}

interface Form {
  visible: boolean
  loading: boolean
  data: FormData
}

const columns = [
  { title: '时间', key: 'nickname' },
  { title: '邀请人数', key: 'nickname' },
  { title: '发私信(人)', key: 'nickname' },
  { title: '发私信(条)', key: 'nickname' },
  { title: '平均发私信(条/人)', key: 'nickname' },
  { title: '瞬间发消息(条)', key: 'nickname' },
  { title: '平均瞬间发消息(条/人)', key: 'nickname' },
  { title: '发动态(人)', key: 'nickname' },
  { title: '发动态(条)', key: 'nickname' },
  { title: '平均发动态(条/人)', key: 'nickname' },
  { title: '发派对(人)', key: 'nickname' },
  { title: '发派对(次)', key: 'nickname' },
  { title: '平均发派对(次/人)', key: 'nickname' },
  { title: '操作', key: 'actions', width: '110px', align: 'center' }

  // { title: '头像', key: 'avatar', align: 'center' },
  // { title: '加入审核人员时间', key: 'create_time', align: 'center' },
]

const inviteColumns = [
  { title: '时间', key: 'nickname' },
  { title: '邀请方', key: 'nickname' },
  { title: '被邀请方', key: 'nickname' },
  { title: '发消息(条)', key: 'nickname' },
  { title: '瞬间发消息(条)', key: 'nickname' },
  { title: '发动态(条)', key: 'nickname' },
  { title: '发派对(次)', key: 'nickname' }
]
let inviteVis = ref(false)
const domain = moduleConfig.avatar.host

const listLoading = ref(false)
const searchForm = reactive<Record<string, any>>({ params: {}, page: 1, pageSize: 10 })

const listData = reactive({
  data: [],
  total: 0
})

const filters = reactive<Array<PreviewData>>([{ type: 'dateRange', placeholder: '时间', name: 'start_time', extName: 'end_time' }])

const defaultFormData = {
  loading: false,
  visible: false,
  data: {}
}
const formRef = ref()
const form = reactive<Form>({ ...defaultFormData })

onBeforeMount(() => {
  getList()
})

const doSearch = (formRes: Array<any>) => {
  // 去除输入框前后空格
  for (const key in formRes) {
    if (Object.prototype.hasOwnProperty.call(formRes, key)) {
      if (typeof formRes[key] == 'string') {
        formRes[key] = formRes[key].trim()
      }
    }
  }
  searchForm.params = formRes
  searchForm.page = 1
  getList()
}

const getList = () => {
  listLoading.value = true
  ajax(review.list, searchForm.params, searchForm.page, searchForm.pageSize)
    .then(res => {
      if (res) {
        listData.data = res.list
        listData.total = res.total
      }
    })
    .catch(() => {
      /** */
    })
    .finally(() => {
      listLoading.value = false
    })
}

const initAdd = () => {
  form.visible = true
}

const onPageChange = (val: number) => {
  console.log(val)
  searchForm.page = val
  getList()
}

const resetFormData = () => {
  Object.assign(
    form,
    { ...defaultFormData },
    {
      data: {}
    }
  )
}

const onSubmit = () => {
  formRef.value.validate((valid: boolean, err: any) => {
    if (!valid) {
      return
    } else {
      // 开始执行添加操作
      console.log(form)
      ajax(review.add, form.data.account_uuid?.trim())
        .then(() => {
          message.success('添加成功')
          form.visible = false
          resetFormData()
          getList()
        })
        .finally(() => {
          form.loading = false
        })
    }
  })
}

const onCloseDialog = () => {
  resetFormData()
}

const onDelete = (id: number) => {
  inviteVis.value = true
}
</script>
<style module>
  
</style>
