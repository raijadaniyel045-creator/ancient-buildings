export interface User {
  id: string
  name: string
  avatar: string
  bio: string
  interests: string[]
  province: string
  postsCount: number
  friendsCount: number
  createdAt: string
  online: boolean
}

export interface FriendRequest {
  id: string
  fromUserId: string
  fromUserName: string
  fromUserAvatar: string
  reason: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

export interface Post {
  id: string
  userId: string
  userName: string
  userAvatar: string
  title: string
  content: string
  image?: string
  images?: string[]
  buildingId?: string
  buildingName?: string
  category: string
  likes: number
  comments: number
  shares: number
  liked: boolean
  createdAt: string
}

export interface Comment {
  id: string
  postId: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
  replies?: Reply[]
}

export interface Reply {
  id: string
  commentId: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
}

export interface HotTopic {
  id: string
  name: string
  count: number
  trend: 'up' | 'down' | 'stable'
}

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: '古建爱好者小王',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square',
    bio: '痴迷于明清古建筑的结构之美，曾走访全国200+古村落',
    interests: ['明清建筑', '园林艺术', '木雕工艺', '古村落'],
    province: '浙江省',
    postsCount: 156,
    friendsCount: 234,
    createdAt: '2024-01-15',
    online: true
  },
  {
    id: 'u2',
    name: '长城守护人',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square',
    bio: '长城文化研究者，致力于长城保护与传承，曾徒步长城全程',
    interests: ['长城', '军事防御', '明代建筑', '边疆史'],
    province: '北京市',
    postsCount: 89,
    friendsCount: 156,
    createdAt: '2024-02-20',
    online: true
  },
  {
    id: 'u3',
    name: '园林设计师小李',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20designer%20portrait%20avatar%20young%20woman&image_size=square',
    bio: '江南园林艺术爱好者，专注于古典园林美学研究与设计',
    interests: ['江南园林', '造景艺术', '文人园林', '盆景艺术'],
    province: '江苏省',
    postsCount: 203,
    friendsCount: 312,
    createdAt: '2024-03-10',
    online: false
  },
  {
    id: 'u4',
    name: '古塔探秘者',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20tower%20explorer%20portrait%20avatar%20adventurer&image_size=square',
    bio: '探访全国各地古塔，记录珍贵影像资料，已探访100+座古塔',
    interests: ['古塔', '佛教建筑', '砖石结构', '摄影'],
    province: '山西省',
    postsCount: 134,
    friendsCount: 189,
    createdAt: '2024-04-05',
    online: true
  },
  {
    id: 'u5',
    name: '榫卯匠人',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20craftsman%20portrait%20avatar%20skilled%20worker&image_size=square',
    bio: '传统榫卯工艺传承者，致力于古建筑木作技艺研究与教学',
    interests: ['榫卯结构', '木作工艺', '传统建筑', '非遗传承'],
    province: '安徽省',
    postsCount: 98,
    friendsCount: 145,
    createdAt: '2024-05-18',
    online: false
  },
  {
    id: 'u6',
    name: '壁画研究员',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20painter%20portrait%20avatar%20artist&image_size=square',
    bio: '专注于敦煌壁画与古建筑彩绘艺术研究，敦煌研究院特约研究员',
    interests: ['壁画艺术', '彩绘', '敦煌', '石窟艺术'],
    province: '甘肃省',
    postsCount: 76,
    friendsCount: 123,
    createdAt: '2024-06-22',
    online: true
  },
  {
    id: 'u7',
    name: '故宫迷妹',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=imperial%20palace%20enthusiast%20portrait%20avatar%20young%20lady&image_size=square',
    bio: '故宫文化深度爱好者，已游览故宫50+次，熟知故宫每一处角落',
    interests: ['故宫', '皇家建筑', '清代建筑', '宫廷文化'],
    province: '北京市',
    postsCount: 167,
    friendsCount: 267,
    createdAt: '2024-07-08',
    online: false
  },
  {
    id: 'u8',
    name: '窑洞文化传承',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cave%20dwelling%20protector%20portrait%20avatar%20local&image_size=square',
    bio: '陕北窑洞文化研究者，致力于传统民居保护与活化利用',
    interests: ['窑洞', '民居建筑', '乡土建筑', '民俗文化'],
    province: '陕西省',
    postsCount: 65,
    friendsCount: 98,
    createdAt: '2024-08-15',
    online: true
  },
  {
    id: 'u9',
    name: '佛光寺守护者',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=buddhist%20temple%20guardian%20portrait%20avatar%20monk&image_size=square',
    bio: '唐代木构建筑研究者，佛光寺文化推广者，文物保护志愿者',
    interests: ['唐代建筑', '佛教建筑', '木构', '文物保护'],
    province: '山西省',
    postsCount: 145,
    friendsCount: 210,
    createdAt: '2024-09-01',
    online: true
  },
  {
    id: 'u10',
    name: '江南水乡客',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=jiangnan%20water%20town%20traveler%20portrait%20avatar&image_size=square',
    bio: '江南水乡古镇深度游爱好者，记录水乡之美，已走访30+古镇',
    interests: ['水乡古镇', '民居', '桥梁', '民俗摄影'],
    province: '浙江省',
    postsCount: 112,
    friendsCount: 178,
    createdAt: '2024-09-15',
    online: false
  },
  {
    id: 'u11',
    name: '石窟艺术行者',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cave%20art%20explorer%20portrait%20avatar%20scholar&image_size=square',
    bio: '石窟艺术爱好者，探访云冈、龙门、麦积山等各大石窟',
    interests: ['石窟艺术', '佛教造像', '石刻', '雕塑'],
    province: '河南省',
    postsCount: 87,
    friendsCount: 134,
    createdAt: '2024-10-01',
    online: false
  },
  {
    id: 'u12',
    name: '古桥鉴赏家',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20bridge%20expert%20portrait%20avatar%20professional&image_size=square',
    bio: '桥梁历史研究者，专注于中国古代桥梁建筑艺术',
    interests: ['古桥', '桥梁工程', '石拱桥', '水利建筑'],
    province: '福建省',
    postsCount: 72,
    friendsCount: 115,
    createdAt: '2024-10-15',
    online: true
  }
]

export const mockFriendRequests: FriendRequest[] = [
  { 
    id: 'fr1', 
    fromUserId: 'u2', 
    fromUserName: '长城守护人',
    fromUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square',
    reason: '想和你一起探讨长城文化，交流保护经验',
    status: 'pending', 
    createdAt: '2024-08-20 10:30' 
  },
  { 
    id: 'fr2', 
    fromUserId: 'u5', 
    fromUserName: '榫卯匠人',
    fromUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20craftsman%20portrait%20avatar%20skilled%20worker&image_size=square',
    reason: '共同研究传统木作工艺，交流榫卯技艺',
    status: 'pending', 
    createdAt: '2024-08-19 15:45' 
  },
  { 
    id: 'fr3', 
    fromUserId: 'u7', 
    fromUserName: '故宫迷妹',
    fromUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=imperial%20palace%20enthusiast%20portrait%20avatar%20young%20lady&image_size=square',
    reason: '一起探索故宫的秘密，分享游览心得',
    status: 'pending', 
    createdAt: '2024-08-18 09:20' 
  },
  { 
    id: 'fr4', 
    fromUserId: 'u9', 
    fromUserName: '佛光寺守护者',
    fromUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=buddhist%20temple%20guardian%20portrait%20avatar%20monk&image_size=square',
    reason: '交流唐代建筑研究心得，共同推广古建筑文化',
    status: 'pending', 
    createdAt: '2024-08-17 20:00' 
  },
  { 
    id: 'fr5', 
    fromUserId: 'u12', 
    fromUserName: '古桥鉴赏家',
    fromUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20bridge%20expert%20portrait%20avatar%20professional&image_size=square',
    reason: '交流古桥研究成果，分享桥梁摄影作品',
    status: 'pending', 
    createdAt: '2024-08-16 14:30' 
  }
]

export const mockPosts: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    userName: '古建爱好者小王',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square',
    title: '探访浙江东阳卢宅，木雕艺术的巅峰之作',
    content: '今天探访了浙江东阳的卢宅，精美的木雕令人叹为观止！特别是那座百工厅，每一根梁枋都雕刻着栩栩如生的人物故事，堪称木雕艺术的巅峰之作。卢宅的木雕题材广泛，从神话传说到历史故事，从花鸟鱼虫到山水风景，无所不包。工匠们用他们精湛的技艺，将木头变成了艺术品。整个建筑群规模宏大，布局严谨，是江南民居建筑的杰出代表。',
    image: 'https://images.unsplash.com/photo-1545486332-9e0999d21567?q=80&w=800&auto=format&fit=crop',
    buildingId: 'luzhai',
    buildingName: '东阳卢宅',
    category: '建筑鉴赏',
    likes: 128,
    comments: 23,
    shares: 15,
    liked: false,
    createdAt: '2024-08-20 14:30'
  },
  {
    id: 'p2',
    userId: 'u2',
    userName: '长城守护人',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square',
    title: '八达岭长城日出，穿越六百年的时光',
    content: '分享一组八达岭长城的日出照片，晨光洒在城墙上，金色的光芒与青砖灰瓦交相辉映，那一刻仿佛穿越回了六百年前。站在长城上，远眺群山，感受历史的厚重与沧桑。每一块砖都承载着故事，每一段墙都见证了岁月。清晨的长城格外宁静，只有微风和偶尔的鸟鸣，让人沉醉其中。',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=800&auto=format&fit=crop',
    buildingId: 'greatwall',
    buildingName: '八达岭长城',
    category: '摄影分享',
    likes: 256,
    comments: 45,
    shares: 32,
    liked: true,
    createdAt: '2024-08-20 08:15'
  },
  {
    id: 'p3',
    userId: 'u3',
    userName: '园林设计师小李',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20designer%20portrait%20avatar%20young%20woman&image_size=square',
    title: '拙政园荷花盛开，江南园林的盛夏之美',
    content: '拙政园的荷花开了！盛夏时节的江南园林别有一番韵味，荷叶田田，荷花映日，与亭台楼阁相映成趣，真是人间仙境。拙政园作为江南园林的代表，其造景手法独具匠心，通过借景、框景、对景等手法，营造出移步换景的美妙体验。夏日的拙政园，荷花飘香，清风徐来，让人忘却尘世的喧嚣。',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea524?q=80&w=800&auto=format&fit=crop',
    buildingId: 'zhuozheng',
    buildingName: '拙政园',
    category: '园林艺术',
    likes: 189,
    comments: 31,
    shares: 24,
    liked: false,
    createdAt: '2024-08-19 16:45'
  },
  {
    id: 'p4',
    userId: 'u4',
    userName: '古塔探秘者',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20tower%20explorer%20portrait%20avatar%20adventurer&image_size=square',
    title: '应县木塔，世界建筑史上的奇迹',
    content: '应县木塔，世界最高的木塔，没有用一根钉子，历经千年风雨依然屹立。今天终于亲眼见到了这座建筑奇迹！木塔高达67.31米，建于辽代清宁二年（公元1056年），是中国现存最高最古的木构塔式建筑，也是唯一一座木结构楼阁式塔。塔身设计精巧，结构复杂，展现了中国古代工匠的高超技艺。',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop',
    buildingId: 'yingxian',
    buildingName: '应县木塔',
    category: '历史研究',
    likes: 312,
    comments: 56,
    shares: 45,
    liked: true,
    createdAt: '2024-08-19 10:20'
  },
  {
    id: 'p5',
    userId: 'u5',
    userName: '榫卯匠人',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20craftsman%20portrait%20avatar%20skilled%20worker&image_size=square',
    title: '传统榫卯结构的魅力与智慧',
    content: '今天给大家演示一下传统榫卯结构的魅力，不用任何胶水和钉子，仅凭精密的木作工艺就能搭建出稳固的结构。这是中国古代工匠智慧的结晶！榫卯结构不仅美观，更体现了中国传统建筑的力学智慧，历经千年依然稳固如初。希望更多人能了解和传承这一宝贵的传统技艺。',
    buildingId: null,
    buildingName: null,
    category: '工艺技术',
    likes: 167,
    comments: 28,
    shares: 18,
    liked: false,
    createdAt: '2024-08-18 20:00'
  },
  {
    id: 'p6',
    userId: 'u7',
    userName: '故宫迷妹',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=imperial%20palace%20enthusiast%20portrait%20avatar%20young%20lady&image_size=square',
    title: '故宫秋色，红墙黄瓦映金黄',
    content: '故宫的秋天真美！金黄的银杏叶铺满了御花园，红墙黄瓦与秋色相映，美得让人窒息。分享一组今天拍的照片。故宫作为世界上现存规模最大、保存最为完整的木质结构古建筑群，每一个季节都有不同的美。秋天的故宫，阳光透过金黄的树叶洒在红墙上，形成斑驳的光影，如梦如幻。',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=800&auto=format&fit=crop',
    buildingId: 'gugong',
    buildingName: '故宫博物院',
    category: '摄影分享',
    likes: 423,
    comments: 78,
    shares: 65,
    liked: true,
    createdAt: '2024-08-18 15:30'
  },
  {
    id: 'p7',
    userId: 'u6',
    userName: '壁画研究员',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20painter%20portrait%20avatar%20artist&image_size=square',
    title: '敦煌壁画中的建筑艺术',
    content: '敦煌壁画不仅是艺术的瑰宝，更是研究古代建筑的珍贵资料。壁画中描绘了大量的宫殿、寺庙、民居等建筑形象，为我们了解古代建筑提供了生动的视觉资料。飞天壁画中的建筑元素，展现了唐代建筑的宏伟与精美。每一幅壁画都是一部立体的历史书，记录着当时的建筑风貌。',
    buildingId: 'dunhuang',
    buildingName: '敦煌莫高窟',
    category: '艺术研究',
    likes: 145,
    comments: 22,
    shares: 20,
    liked: false,
    createdAt: '2024-08-17 14:00'
  },
  {
    id: 'p8',
    userId: 'u9',
    userName: '佛光寺守护者',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=buddhist%20temple%20guardian%20portrait%20avatar%20monk&image_size=square',
    title: '佛光寺东大殿，唐代建筑的活化石',
    content: '佛光寺东大殿是中国现存最早的木结构建筑之一，建于唐代大中十一年（公元857年）。这座大殿不仅是建筑艺术的杰作，更是研究唐代建筑的珍贵实物资料。殿内的唐代雕塑和壁画同样令人叹为观止。站在大殿前，仿佛能感受到千年时光的流转，体会到唐代建筑的雄浑气势。',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop',
    buildingId: 'foguang',
    buildingName: '佛光寺',
    category: '历史研究',
    likes: 234,
    comments: 42,
    shares: 30,
    liked: false,
    createdAt: '2024-08-16 11:30'
  },
  {
    id: 'p9',
    userId: 'u8',
    userName: '窑洞文化传承',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cave%20dwelling%20protector%20portrait%20avatar%20local&image_size=square',
    title: '陕北窑洞，黄土高原上的智慧居所',
    content: '陕北窑洞是黄土高原上独特的民居形式，体现了人与自然和谐共生的智慧。窑洞冬暖夏凉，节约能源，是传统民居中的典范。近年来，窑洞保护和改造成为热点，让这一传统居住方式焕发新生。窑洞不仅是居住空间，更是一种文化符号，承载着陕北人民的历史记忆。',
    buildingId: 'yaodong',
    buildingName: '陕北窑洞',
    category: '民居研究',
    likes: 98,
    comments: 18,
    shares: 12,
    liked: false,
    createdAt: '2024-08-15 16:20'
  },
  {
    id: 'p10',
    userId: 'u10',
    userName: '江南水乡客',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=jiangnan%20water%20town%20traveler%20portrait%20avatar&image_size=square',
    title: '周庄古镇，小桥流水人家',
    content: '周庄古镇，江南水乡的代表，小桥流水人家的意境在这里体现得淋漓尽致。青石板路、古桥、河道、白墙黛瓦，构成了一幅美丽的水墨画。这里不仅是旅游胜地，更是活着的历史博物馆。漫步在周庄的小巷中，仿佛穿越时光，回到了几百年前的江南水乡。',
    image: 'https://images.unsplash.com/photo-1544551763-d76694265947?q=80&w=800&auto=format&fit=crop',
    buildingId: 'zhouzhuang',
    buildingName: '周庄古镇',
    category: '旅游推荐',
    likes: 178,
    comments: 34,
    shares: 26,
    liked: true,
    createdAt: '2024-08-14 09:45'
  },
  {
    id: 'p11',
    userId: 'u11',
    userName: '石窟艺术行者',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cave%20art%20explorer%20portrait%20avatar%20scholar&image_size=square',
    title: '云冈石窟，雕刻艺术的巅峰',
    content: '云冈石窟是中国四大石窟之一，以其精美的雕刻艺术闻名于世。石窟群共有53个洞窟，5.1万余尊造像，是北魏时期佛教艺术的杰作。每一尊佛像都栩栩如生，展现了古代工匠的高超技艺。站在巨大的佛像前，不禁为古人的智慧和创造力所折服。',
    image: 'https://images.unsplash.com/photo-1511974035430-5de4d2e85947?q=80&w=800&auto=format&fit=crop',
    buildingId: 'yungang',
    buildingName: '云冈石窟',
    category: '艺术研究',
    likes: 198,
    comments: 38,
    shares: 28,
    liked: false,
    createdAt: '2024-08-13 14:00'
  },
  {
    id: 'p12',
    userId: 'u12',
    userName: '古桥鉴赏家',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20bridge%20expert%20portrait%20avatar%20professional&image_size=square',
    title: '泉州洛阳桥，跨海石桥的典范',
    content: '泉州洛阳桥是中国现存最早的跨海石桥，建于北宋皇祐五年（公元1053年），已有近千年历史。桥梁全长834米，宽7米，采用"筏形基础"和"种蛎固基"等先进技术，是中国古代桥梁建筑的杰作。洛阳桥不仅是交通要道，更是海上丝绸之路的重要见证。',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=800&auto=format&fit=crop',
    buildingId: 'luoyangqiao',
    buildingName: '洛阳桥',
    category: '建筑鉴赏',
    likes: 156,
    comments: 29,
    shares: 22,
    liked: false,
    createdAt: '2024-08-12 11:30'
  },
  {
    id: 'p13',
    userId: 'u1',
    userName: '古建爱好者小王',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square',
    title: '徽州古村落的建筑美学',
    content: '徽州古村落以其独特的建筑风格和深厚的文化底蕴吸引着无数游客。粉墙黛瓦、马头墙、天井院，构成了徽州建筑的独特风貌。宏村、西递、呈坎等古村落，不仅是建筑艺术的宝库，更是中国传统文化的活化石。漫步在徽州的古巷中，感受那份宁静与古朴。',
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=800&auto=format&fit=crop',
    buildingId: 'huizhou',
    buildingName: '徽州古村落',
    category: '建筑鉴赏',
    likes: 212,
    comments: 41,
    shares: 33,
    liked: true,
    createdAt: '2024-08-11 16:00'
  },
  {
    id: 'p14',
    userId: 'u3',
    userName: '园林设计师小李',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20designer%20portrait%20avatar%20young%20woman&image_size=square',
    title: '留园的空间艺术',
    content: '留园是苏州四大名园之一，以其精巧的空间布局和丰富的造景手法著称。园林虽小，但移步换景，处处皆景。留园的空间处理巧妙，通过建筑、山石、水体的巧妙组合，创造出丰富多变的景观效果。每一个角落都经过精心设计，体现了江南园林"小中见大"的美学理念。',
    image: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?q=80&w=800&auto=format&fit=crop',
    buildingId: 'liuyuan',
    buildingName: '留园',
    category: '园林艺术',
    likes: 176,
    comments: 32,
    shares: 25,
    liked: false,
    createdAt: '2024-08-10 10:30'
  },
  {
    id: 'p15',
    userId: 'u6',
    userName: '壁画研究员',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20painter%20portrait%20avatar%20artist&image_size=square',
    title: '永乐宫壁画的艺术价值',
    content: '永乐宫壁画是中国现存规模最大、保存最完整的道教壁画，绘制于元代，已有700多年历史。壁画总面积达1000多平方米，描绘了道教诸神和神话故事，色彩鲜艳，线条流畅，是中国壁画艺术的巅峰之作。每一笔每一划都展现了古代画师的精湛技艺。',
    buildingId: 'yonglegong',
    buildingName: '永乐宫',
    category: '艺术研究',
    likes: 134,
    comments: 25,
    shares: 19,
    liked: false,
    createdAt: '2024-08-09 14:00'
  }
]

export const mockComments: Comment[] = [
  {
    id: 'c1',
    postId: 'p1',
    userId: 'u3',
    userName: '园林设计师小李',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20designer%20portrait%20avatar%20young%20woman&image_size=square',
    content: '卢宅确实值得一去！去年去过一次，木雕确实精美绝伦。特别是那个百狮台，太震撼了！',
    createdAt: '2024-08-20 15:00',
    replies: [
      {
        id: 'r1',
        commentId: 'c1',
        userId: 'u1',
        userName: '古建爱好者小王',
        userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square',
        content: '是的，百狮台确实是精华！而且整个建筑群的布局也很讲究。',
        createdAt: '2024-08-20 15:15'
      },
      {
        id: 'r2',
        commentId: 'c1',
        userId: 'u5',
        userName: '榫卯匠人',
        userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20craftsman%20portrait%20avatar%20skilled%20worker&image_size=square',
        content: '东阳木雕是中国四大木雕之首，卢宅是其代表作。',
        createdAt: '2024-08-20 15:20'
      }
    ]
  },
  {
    id: 'c2',
    postId: 'p1',
    userId: 'u5',
    userName: '榫卯匠人',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20craftsman%20portrait%20avatar%20skilled%20worker&image_size=square',
    content: '东阳木雕是中国四大木雕之首，卢宅是其代表作。木雕工艺讲究"三分雕刻，七分打磨"，可见工匠们的用心。',
    createdAt: '2024-08-20 15:30'
  },
  {
    id: 'c3',
    postId: 'p2',
    userId: 'u7',
    userName: '故宫迷妹',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=imperial%20palace%20enthusiast%20portrait%20avatar%20young%20lady&image_size=square',
    content: '长城日出太美了！下次一定要去看一次。请问几点去比较合适？',
    createdAt: '2024-08-20 09:00',
    replies: [
      {
        id: 'r3',
        commentId: 'c3',
        userId: 'u2',
        userName: '长城守护人',
        userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square',
        content: '建议提前1-2小时到达，找个好位置等待日出。夏天一般5点半左右日出。',
        createdAt: '2024-08-20 09:30'
      },
      {
        id: 'r4',
        commentId: 'c3',
        userId: 'u10',
        userName: '江南水乡客',
        userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=jiangnan%20water%20town%20traveler%20portrait%20avatar&image_size=square',
        content: '记得带件外套，早上山上还是挺凉的！',
        createdAt: '2024-08-20 09:35'
      }
    ]
  },
  {
    id: 'c4',
    postId: 'p2',
    userId: 'u4',
    userName: '古塔探秘者',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20tower%20explorer%20portrait%20avatar%20adventurer&image_size=square',
    content: '长城的美在于它的雄伟与历史感，每次去都有不同的感受。',
    createdAt: '2024-08-20 09:45'
  },
  {
    id: 'c5',
    postId: 'p3',
    userId: 'u1',
    userName: '古建爱好者小王',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square',
    content: '拙政园的荷花确实名不虚传，江南园林的代表！可惜今年夏天太热了，不然真想再去一次。',
    createdAt: '2024-08-19 17:00'
  },
  {
    id: 'c6',
    postId: 'p3',
    userId: 'u10',
    userName: '江南水乡客',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=jiangnan%20water%20town%20traveler%20portrait%20avatar&image_size=square',
    content: '江南园林的夏天确实很美，荷花、荷叶、亭台楼阁，构成一幅完美的画卷。',
    createdAt: '2024-08-19 17:15'
  },
  {
    id: 'c7',
    postId: 'p4',
    userId: 'u2',
    userName: '长城守护人',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square',
    content: '应县木塔确实是建筑奇迹，结构太精妙了！上次去的时候正在修缮，期待下次去能看到完整的木塔。',
    createdAt: '2024-08-19 11:00'
  },
  {
    id: 'c8',
    postId: 'p4',
    userId: 'u9',
    userName: '佛光寺守护者',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=buddhist%20temple%20guardian%20portrait%20avatar%20monk&image_size=square',
    content: '应县木塔和佛光寺都是唐代建筑的瑰宝，有机会应该都去看看。唐代木构建筑现存极少，每一座都是国宝。',
    createdAt: '2024-08-19 11:30',
    replies: [
      {
        id: 'r5',
        commentId: 'c8',
        userId: 'u4',
        userName: '古塔探秘者',
        userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20tower%20explorer%20portrait%20avatar%20adventurer&image_size=square',
        content: '赞同！唐代建筑的雄浑气势是后世难以企及的。',
        createdAt: '2024-08-19 11:45'
      }
    ]
  },
  {
    id: 'c9',
    postId: 'p5',
    userId: 'u1',
    userName: '古建爱好者小王',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square',
    content: '榫卯结构真是神奇！不用钉子就能搭建出如此稳固的结构，古人的智慧令人叹服。',
    createdAt: '2024-08-18 20:30'
  },
  {
    id: 'c10',
    postId: 'p5',
    userId: 'u3',
    userName: '园林设计师小李',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20designer%20portrait%20avatar%20young%20woman&image_size=square',
    content: '榫卯不仅用于建筑，传统家具也大量使用，体现了中国传统工艺的精湛。',
    createdAt: '2024-08-18 21:00'
  },
  {
    id: 'c11',
    postId: 'p6',
    userId: 'u1',
    userName: '古建爱好者小王',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square',
    content: '故宫的秋天确实美！红墙、黄瓦、银杏，简直绝配。',
    createdAt: '2024-08-18 16:00'
  },
  {
    id: 'c12',
    postId: 'p6',
    userId: 'u3',
    userName: '园林设计师小李',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20designer%20portrait%20avatar%20young%20woman&image_size=square',
    content: '羡慕住在北京的朋友，可以随时去故宫！',
    createdAt: '2024-08-18 16:30'
  },
  {
    id: 'c13',
    postId: 'p6',
    userId: 'u7',
    userName: '故宫迷妹',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=imperial%20palace%20enthusiast%20portrait%20avatar%20young%20lady&image_size=square',
    content: '其实故宫每个季节都有不同的美，春天的海棠、夏天的碧荷、秋天的银杏、冬天的雪景，都值得一看！',
    createdAt: '2024-08-18 17:00'
  },
  {
    id: 'c14',
    postId: 'p7',
    userId: 'u6',
    userName: '壁画研究员',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20painter%20portrait%20avatar%20artist&image_size=square',
    content: '敦煌壁画中的建筑形象非常丰富，从宫殿到民居，从寺庙到城池，为我们研究古代建筑提供了宝贵的资料。',
    createdAt: '2024-08-17 14:30'
  },
  {
    id: 'c15',
    postId: 'p8',
    userId: 'u9',
    userName: '佛光寺守护者',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=buddhist%20temple%20guardian%20portrait%20avatar%20monk&image_size=square',
    content: '佛光寺东大殿是中国现存最早的木结构建筑之一，具有极高的历史和艺术价值。',
    createdAt: '2024-08-16 12:00'
  },
  {
    id: 'c16',
    postId: 'p8',
    userId: 'u4',
    userName: '古塔探秘者',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20tower%20explorer%20portrait%20avatar%20adventurer&image_size=square',
    content: '唐代建筑的斗拱真是太精美了，层层叠叠，结构复杂而有序。',
    createdAt: '2024-08-16 12:30'
  },
  {
    id: 'c17',
    postId: 'p9',
    userId: 'u8',
    userName: '窑洞文化传承',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cave%20dwelling%20protector%20portrait%20avatar%20local&image_size=square',
    content: '窑洞是黄土高原人民适应自然环境的智慧结晶，冬暖夏凉，非常舒适。',
    createdAt: '2024-08-15 17:00'
  },
  {
    id: 'c18',
    postId: 'p10',
    userId: 'u1',
    userName: '古建爱好者小王',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square',
    content: '周庄确实很美，但商业化有点严重，建议早上去人少的时候逛。',
    createdAt: '2024-08-14 10:30'
  },
  {
    id: 'c19',
    postId: 'p11',
    userId: 'u11',
    userName: '石窟艺术行者',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cave%20art%20explorer%20portrait%20avatar%20scholar&image_size=square',
    content: '云冈石窟的雕刻艺术真是震撼，特别是第5、6窟的巨型佛像，令人叹为观止。',
    createdAt: '2024-08-13 14:30'
  },
  {
    id: 'c20',
    postId: 'p12',
    userId: 'u12',
    userName: '古桥鉴赏家',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20bridge%20expert%20portrait%20avatar%20professional&image_size=square',
    content: '洛阳桥的"种蛎固基"技术非常先进，用牡蛎来加固桥墩，真是聪明的办法！',
    createdAt: '2024-08-12 12:00'
  }
]

export const mockHotTopics: HotTopic[] = [
  { id: 't1', name: '#故宫600年#', count: 1256, trend: 'up' },
  { id: 't2', name: '#长城保护#', count: 892, trend: 'up' },
  { id: 't3', name: '#唐代建筑#', count: 654, trend: 'stable' },
  { id: 't4', name: '#园林艺术#', count: 432, trend: 'down' },
  { id: 't5', name: '#榫卯结构#', count: 318, trend: 'up' },
  { id: 't6', name: '#敦煌壁画#', count: 276, trend: 'stable' },
  { id: 't7', name: '#江南水乡#', count: 245, trend: 'down' },
  { id: 't8', name: '#应县木塔#', count: 198, trend: 'up' },
  { id: 't9', name: '#石窟艺术#', count: 187, trend: 'up' },
  { id: 't10', name: '#徽州建筑#', count: 165, trend: 'stable' }
]

export interface Message {
  id: string
  fromUserId: string
  toUserId: string
  content: string
  isRead: boolean
  createdAt: string
}

export interface Conversation {
  id: string
  userId: string
  otherUserId: string
  otherUserName: string
  otherUserAvatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

export const mockMessages: Message[] = [
  { id: 'm1', fromUserId: 'u1', toUserId: 'current', content: '你好！很高兴认识你，我看你也喜欢古建筑文化。', isRead: true, createdAt: '2024-08-20 15:30' },
  { id: 'm2', fromUserId: 'current', toUserId: 'u1', content: '你好！是的，我特别喜欢古建筑，尤其是江南园林。', isRead: true, createdAt: '2024-08-20 15:32' },
  { id: 'm3', fromUserId: 'u1', toUserId: 'current', content: '那太好了！我最近在东阳卢宅，拍了很多木雕照片，你要看看吗？', isRead: true, createdAt: '2024-08-20 15:35' },
  { id: 'm4', fromUserId: 'u2', toUserId: 'current', content: '长城最近有个保护活动，你有兴趣参加吗？', isRead: false, createdAt: '2024-08-20 16:00' },
  { id: 'm5', fromUserId: 'u3', toUserId: 'current', content: '拙政园的荷花开了，拍了一些照片分享给你！', isRead: false, createdAt: '2024-08-20 16:15' }
]

export const mockConversations: Conversation[] = [
  { id: 'conv1', userId: 'current', otherUserId: 'u1', otherUserName: '古建爱好者小王', otherUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square', lastMessage: '那太好了！我最近在东阳卢宅，拍了很多木雕照片，你要看看吗？', lastMessageTime: '2024-08-20 15:35', unreadCount: 0 },
  { id: 'conv2', userId: 'current', otherUserId: 'u2', otherUserName: '长城守护人', otherUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square', lastMessage: '长城最近有个保护活动，你有兴趣参加吗？', lastMessageTime: '2024-08-20 16:00', unreadCount: 1 },
  { id: 'conv3', userId: 'current', otherUserId: 'u3', otherUserName: '园林设计师小李', otherUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20designer%20portrait%20avatar%20young%20woman&image_size=square', lastMessage: '拙政园的荷花开了，拍了一些照片分享给你！', lastMessageTime: '2024-08-20 16:15', unreadCount: 1 }
]

export const currentUser: User = {
  id: 'current',
  name: '古建探索者',
  avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20chinese%20person%20portrait%20avatar%20professional&image_size=square',
  bio: '热爱中国古建筑文化的探索者，致力于发现和分享古建筑之美',
  interests: ['古建筑', '历史文化', '传统工艺', '摄影'],
  province: '北京市',
  postsCount: 45,
  friendsCount: 89,
  createdAt: '2024-01-01',
  online: true
}

export let friendsList: User[] = [...mockUsers.slice(0, 6)]
