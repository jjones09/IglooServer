import {
  authenticated,
  inheritAuthorized,
  logErrorsPromise,
  inheritAuthorizedScalarPropsResolvers,
  deviceToParents,
} from './utilities'

const QUERY_COST = 1
const notificationToParent = notificationFound => notificationFound.deviceId

const UserResolver = ({
  Notification, User, Device, Board,
}) => ({
  ...inheritAuthorizedScalarPropsResolvers(
    Notification,
    User,
    ['content', 'date'],
    notificationToParent,
    Device,
    deviceToParents(Board),
  ),
  user(root, args, context) {
    return logErrorsPromise(
      'Notification user resolver',
      120,
      inheritAuthorized(
        root.id,
        Notification,
        User,
        notificationToParent,
        context,
        Device,
        1,
        async (resolve, reject, notificationFound) => {
          resolve({ id: notificationFound.userId })
          context.billingUpdater.update(QUERY_COST)
        },
        deviceToParents(Board),
      ),
    )
  },
  device(root, args, context) {
    return logErrorsPromise(
      'Notification device resolver',
      121,
      inheritAuthorized(
        root.id,
        Notification,
        User,
        notificationToParent,
        context,
        Device,
        1,
        async (resolve, reject, notificationFound) => {
          resolve({ id: notificationFound.deviceId })
          context.billingUpdater.update(QUERY_COST)
        },
        deviceToParents(Board),
      ),
    )
  },
  visualized(root, args, context) {
    return logErrorsPromise(
      'Notification device resolver',
      121,
      inheritAuthorized(
        root.id,
        Notification,
        User,
        notificationToParent,
        context,
        Device,
        1,
        async (resolve, reject, notificationFound) => {
          resolve(notificationFound.visualized.indexOf(context.auth.userId) !== -1)
          context.billingUpdater.update(QUERY_COST)
        },
        deviceToParents(Board),
      ),
    )
  },
  snackbarVisualized(root, args, context) {
    return logErrorsPromise(
      'Notification device resolver',
      121,
      inheritAuthorized(
        root.id,
        Notification,
        User,
        notificationToParent,
        context,
        Device,
        1,
        async (resolve, reject, notificationFound) => {
          resolve(notificationFound.snackbarVisualized.indexOf(context.auth.userId) !== -1)
          context.billingUpdater.update(QUERY_COST)
        },
        deviceToParents(Board),
      ),
    )
  },
})

export default UserResolver
