import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { extname, join } from 'node:path'

const RENAMES = {
  auth_register: 'register',
  auth_login: 'login',
  auth_refresh: 'refreshTokens',
  auth_logout: 'logout',
  auth_approveDevice: 'approveDevice',
  authMobile_register: 'mobileRegister',
  authMobile_login: 'mobileLogin',
  authMobile_refresh: 'mobileRefreshTokens',
  authMobile_logout: 'mobileLogout',
  authMobile_createDeviceCode: 'createDeviceCode',
  authMobile_pollDeviceCode: 'pollDeviceCode',
  user_findMe: 'currentUser',
  user_updateProfile: 'updateProfile',
  user_deleteMe: 'deleteAccount',
  user_getMyTaste: 'myTasteStats',
  user_changePassword: 'changePassword',
  user_findPublic: 'publicProfileByUsername',
  integration_search: 'searchTitles',
  discover_getTrending: 'trendingTitles',
  discover_findByKey: 'title',
  discover_findMyState: 'userTitle',
  review_findByDiscoverKey: 'titleReviews',
  review_createByDiscoverKey: 'createReview',
  review_findMy: 'myReviews',
  review_update: 'updateReview',
  review_delete: 'deleteReview',
  library_findAll: 'libraryTitles',
  library_update: 'updateLibraryTitle',
  library_setStatusByDiscoverKey: 'setTitleStatus',
  library_deleteByDiscoverKey: 'removeFromLibrary',
  subscription_findMy: 'mySubscription',
  subscription_verifyPurchase: 'verifyPurchase',
  subscription_startTrial: 'startTrial',
  subscription_cancel: 'cancelSubscription',
  collection_findAll: 'myCollections',
  collection_create: 'createCollection',
  collection_findPublic: 'publicCollection',
  collection_findById: 'collectionById',
  collection_update: 'updateCollection',
  collection_delete: 'deleteCollection',
  collection_addTitleByDiscoverKey: 'addToCollection',
  collection_removeTitleByDiscoverKey: 'removeFromCollection',
  collection_share: 'shareCollection',
  notification_findAll: 'myNotifications',
  notification_markAsRead: 'markNotificationRead',
  notification_markAllAsRead: 'markAllNotificationsRead',
  notification_delete: 'deleteNotification',
  notification_registerPushToken: 'registerPushToken',
  notification_removePushToken: 'removePushToken',
  friendship_findAll: 'myFriends',
  friendship_findRequests: 'myFriendRequests',
  friendship_request: 'sendFriendRequest',
  friendship_accept: 'acceptFriendRequest',
  friendship_remove: 'removeFriend',
  ai_getRecommendations: 'aiRecommendations',
  ai_pick: 'aiPickTitle',
  ai_getSummary: 'aiTitleSummary'
}

const ROOTS = ['apps', 'packages']
const IGNORED_DIRS = new Set([
  'node_modules',
  'generated',
  'dist',
  '.expo',
  '.next',
  'ios',
  'android'
])
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.mjs'])

const toCamel = operationId =>
  operationId.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())

const toPascal = name => name[0].toUpperCase() + name.slice(1)

const replacements = Object.entries(RENAMES)
  .flatMap(([operationId, newName]) => {
    const oldName = toCamel(operationId)

    return [
      { from: new RegExp(`'${operationId}'`, 'g'), to: `'${newName}'` },
      {
        from: new RegExp(`${toPascal(oldName)}(?=[A-Z0-9_]|\\b)`, 'g'),
        to: toPascal(newName)
      },
      {
        from: new RegExp(`\\b${oldName}(?=[A-Z0-9_]|\\b)`, 'g'),
        to: newName
      }
    ]
  })
  .sort((a, b) => b.from.source.length - a.from.source.length)

const collectFiles = dir =>
  readdirSync(dir).flatMap(name => {
    const path = join(dir, name)

    if (statSync(path).isDirectory()) {
      return IGNORED_DIRS.has(name) ? [] : collectFiles(path)
    }

    return EXTENSIONS.has(extname(name)) ? [path] : []
  })

let changedCount = 0

for (const file of ROOTS.flatMap(collectFiles)) {
  const source = readFileSync(file, 'utf8')
  const result = replacements.reduce(
    (text, { from, to }) => text.replace(from, to),
    source
  )

  if (result !== source) {
    writeFileSync(file, result)
    changedCount++
    console.log(`updated ${file}`)
  }
}

console.log(`\nDone: ${changedCount} files updated`)
