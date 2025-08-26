
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "redirectTo": "/main/dashboard",
    "route": "/main"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ATM5T254.js"
    ],
    "route": "/main/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-G4TE4NNF.js"
    ],
    "route": "/main/merchant-service"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-G4TE4NNF.js"
    ],
    "route": "/main/merchant"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-G4TE4NNF.js"
    ],
    "route": "/main/merchant-management"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4M33KX3M.js"
    ],
    "route": "/main/user-management"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5FQUBSNU.js"
    ],
    "route": "/main/order-management"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XQZR7OJ3.js"
    ],
    "route": "/main/promo-management"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4FT77V4L.js"
    ],
    "route": "/main/category-management"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7LLRKGQQ.js"
    ],
    "route": "/main/banner-management"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ND35UIVF.js"
    ],
    "route": "/main/setting-management"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YXX4WTOL.js",
      "chunk-RECFE55V.js",
      "chunk-JCJIXIGU.js",
      "chunk-K7HSCCCA.js",
      "chunk-EO76AIFO.js",
      "chunk-77SV7R7M.js"
    ],
    "route": "/main/transaction-history"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TBPXHEHL.js"
    ],
    "route": "/main/product-category-management"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PTZNFEGU.js"
    ],
    "route": "/main/Charts"
  },
  {
    "renderMode": 2,
    "route": "/unauthorized"
  },
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 66061, hash: 'fef9bd14520877db3db37895bb86a499746fcdbf3cf92d708c3cf7a4afbc2813', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 11780, hash: '315e99c969136096bed5339d6f92aa30485ee20168aa2d122ce84e43be542e0d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 77402, hash: '5be9b76ef51a1a52f778deba06b68b7aa23b63a90d1f90a966aa8ee265ea43b9', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'main/dashboard/index.html': {size: 77455, hash: 'd64a32f85468c9471f6b540acee5f3b1ca7a0aa2f642835068d8cfef17bcb1f7', text: () => import('./assets-chunks/main_dashboard_index_html.mjs').then(m => m.default)},
    'main/merchant-service/index.html': {size: 77455, hash: '1ec9d30c87ae8996844029866f6e0bdf2594847456e28d8c1322070516cac08a', text: () => import('./assets-chunks/main_merchant-service_index_html.mjs').then(m => m.default)},
    'main/merchant/index.html': {size: 77455, hash: '1ec9d30c87ae8996844029866f6e0bdf2594847456e28d8c1322070516cac08a', text: () => import('./assets-chunks/main_merchant_index_html.mjs').then(m => m.default)},
    'main/merchant-management/index.html': {size: 77455, hash: '1ec9d30c87ae8996844029866f6e0bdf2594847456e28d8c1322070516cac08a', text: () => import('./assets-chunks/main_merchant-management_index_html.mjs').then(m => m.default)},
    'main/user-management/index.html': {size: 77455, hash: '0c310ba9d0f719597946f90c54f57f67279ff8c881f983d7fc4ac0338edf738d', text: () => import('./assets-chunks/main_user-management_index_html.mjs').then(m => m.default)},
    'main/order-management/index.html': {size: 77455, hash: '54b98f33e172667c29a167530ad24ac04034a432eb8ecd38c6edf58945fae1d0', text: () => import('./assets-chunks/main_order-management_index_html.mjs').then(m => m.default)},
    'main/promo-management/index.html': {size: 77455, hash: 'ef171fb28d584bee922502cad05c32164b5c13a7c70f7791e98aa9bc8ad7ab27', text: () => import('./assets-chunks/main_promo-management_index_html.mjs').then(m => m.default)},
    'main/category-management/index.html': {size: 77455, hash: '97fcab2a14577e1b011619d6618b0d3b51eeb12ac6009e70f7c0bfe7e324fbf5', text: () => import('./assets-chunks/main_category-management_index_html.mjs').then(m => m.default)},
    'main/banner-management/index.html': {size: 77455, hash: '50b58be318a694c7b561addbe71d2e34e12274e767577cce726255a77b113909', text: () => import('./assets-chunks/main_banner-management_index_html.mjs').then(m => m.default)},
    'main/setting-management/index.html': {size: 77455, hash: 'fc19f8941d2b90bc4dbaf456c71f73a554ac4221bb7149fd24548a2efa016741', text: () => import('./assets-chunks/main_setting-management_index_html.mjs').then(m => m.default)},
    'unauthorized/index.html': {size: 77402, hash: '5be9b76ef51a1a52f778deba06b68b7aa23b63a90d1f90a966aa8ee265ea43b9', text: () => import('./assets-chunks/unauthorized_index_html.mjs').then(m => m.default)},
    'main/product-category-management/index.html': {size: 77455, hash: '5b5f38caade80b0e057caa38de7fdf5b0fa90359b808ee6f6a4210ea86692ca7', text: () => import('./assets-chunks/main_product-category-management_index_html.mjs').then(m => m.default)},
    'main/Charts/index.html': {size: 77455, hash: '6d62ef5eff6426f44d084183aa5b7416871de13bb3c33a27db593365d2a7be74', text: () => import('./assets-chunks/main_Charts_index_html.mjs').then(m => m.default)},
    'main/transaction-history/index.html': {size: 77715, hash: '0619dd24bedb1450c118770eb57f1f55fbc228ff6d7315b07438bb2db70e13b0', text: () => import('./assets-chunks/main_transaction-history_index_html.mjs').then(m => m.default)},
    'styles-F2WJLAJD.css': {size: 124175, hash: 'mWTwd+nQnU8', text: () => import('./assets-chunks/styles-F2WJLAJD_css.mjs').then(m => m.default)}
  },
};
