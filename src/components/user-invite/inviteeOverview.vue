<template>
  <div>
    <search :data="filters" @search="doSearch" :hasDefaultDate="false"></search>
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
    </g-table>
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
  { title: '平均发派对(次/人)', key: 'nickname' }

  // { title: '头像', key: 'avatar', align: 'center' },
  // { title: '加入审核人员时间', key: 'create_time', align: 'center' },
]

const domain = moduleConfig.avatar.host

const listLoading = ref(false)
const searchForm = reactive<Record<string, any>>({ params: {}, page: 1, pageSize: 10 })

const listData = reactive({
  data: [],
  total: 0
})

const filters = reactive<Array<PreviewData>>([{ type: 'dateRange', placeholder: '时间', name: 'start_time', extName: 'end_time' }])

onBeforeMount(() => {
  getList()
})

const doSearch = (formRes: Array<any>) => {
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

const onPageChange = (val: number) => {
  console.log(val)
  searchForm.page = val
  getList()
}
</script>
