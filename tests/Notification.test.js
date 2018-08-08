import NotificationResolver from '../graphql/resolvers/Notification'
import { checkScalarProps, checkRejectUnauthenticated } from './utilities'
import { MockNotification, MockBillingUpdater } from './mocks'

describe('Notification resolver', () => {
  const notificationScalarProps = [
    'content',
    'date',
    'visualized',
    'snackbarVisualized',
  ]
  checkScalarProps(
    notificationScalarProps,
    MockNotification.mockData,
    NotificationResolver,
    MockNotification,
    'fakeNotificationId',
  )

  test('should resolve the prop user', async () => {
    const mockNotification = MockNotification()
    const resolver = NotificationResolver(mockNotification)

    const mockBillingUpdater = MockBillingUpdater()
    const userLoaded = await resolver.user(
      { id: 'fakeNotificationId' },
      {},
      {
        auth: {
          userId: 'fakeUserId',
          accessLevel: 'OWNER',
          tokenType: 'TEMPORARY',
        },
        billingUpdater: mockBillingUpdater,
      },
    )

    expect(mockNotification.find.called).toBe(true)
    expect(userLoaded.id).toBe(MockNotification.mockData.userId)
  })

  test('should resolve the prop device', async () => {
    const mockNotification = MockNotification()
    const resolver = NotificationResolver(mockNotification)

    const mockBillingUpdater = MockBillingUpdater()
    const deviceLoaded = await resolver.device(
      { id: 'fakeNotificationId' },
      {},
      {
        auth: {
          userId: 'fakeUserId',
          accessLevel: 'OWNER',
          tokenType: 'TEMPORARY',
        },
        billingUpdater: mockBillingUpdater,
      },
    )

    expect(mockNotification.find.called).toBe(true)
    expect(deviceLoaded.id).toBe(MockNotification.mockData.deviceId)
  })

  const notificationProps = [...notificationScalarProps, 'user', 'device']
  checkRejectUnauthenticated(
    notificationProps,
    NotificationResolver,
    MockNotification,
  )
})