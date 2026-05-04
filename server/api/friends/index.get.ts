import { friendsList, mockFriendRequests, currentUser } from '../../data/friends'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const status = query.status as string || 'all'
  
  const friends = friendsList.map(user => ({
    ...user,
    isFriend: true
  }))
  
  const pendingRequests = mockFriendRequests.filter(r => r.status === 'pending')
  
  const stats = {
    total: friends.length,
    online: friends.filter(f => f.online).length,
    pendingRequests: pendingRequests.length
  }
  
  return {
    success: true,
    friends,
    pendingRequests,
    currentUser
  }
})