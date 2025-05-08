/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const walletRouter = {
  path: '/wallet',
  component: Layout,
  redirect: '/wallet/detail',
  name: 'Wallet',
  meta: {
    title: 'wallet',
    icon: 'wallet'
  },
  children: [
    {
      path: 'detail',
      component: () => import('@/views/wallet/detail/index'),
      name: 'Detail',
      meta: { title: 'detail' }
    },
    {
      path: 'history',
      name: 'History',
      component: () => import('@/views/wallet/history/index'),
      meta: { title: 'history' }
    }
  ]
}

export default walletRouter
