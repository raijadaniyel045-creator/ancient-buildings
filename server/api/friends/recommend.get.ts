import { mockUsers, currentUser } from '../../data/friends'

export default defineEventHandler((event) => {
  const recommendations = mockUsers.slice(2, 8).map(user => {
    const commonInterests = user.interests.filter(
      interest => currentUser.interests.some(
        userInterest => interest.includes(userInterest) || userInterest.includes(interest)
      )
    )
    return {
      ...user,
      matchScore: commonInterests.length + Math.floor(Math.random() * 3),
      commonInterests
    }
  }).sort((a, b) => b.matchScore - a.matchScore)
  
  return {
    success: true,
    recommendations
  }
})