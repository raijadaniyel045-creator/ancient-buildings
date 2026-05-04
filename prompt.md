这是一个非常专业且成熟的工程习惯！在使用 AI（如 Trae、Cursor）进行中大型项目开发时，**“圈定边界”**比“直接写代码”更重要。如果不强制约束，AI 很容易为了图方便，引入你不需要的第三方库，或者把代码写在错误的目录下，最终导致整个工程变成一座“屎山”。

为了彻底锁死 AI 的发挥边界，让它乖乖在你既定的框架内写代码，你需要给它设定一个**《项目全局约束协议》（Project Constraints & Architecture Blueprint）**。

在 Trae/Cursor 等 AI IDE 中，最好的做法是在项目的根目录下新建一个名为 **`.cursorrules`** 或 **`prompt.md`** 的文件，并把以下内容粘贴进去。每次让它写复杂功能前，让它先读取这个文件。

***

### 请复制以下约束协议作为你项目的全局 Prompt：

--------------------------------------------------
**【项目全局约束与架构基准】**
你现在正在参与开发“榫卯交游（Sunmao Connect）”项目。在生成任何代码之前，必须绝对服从以下架构约束、目录规范和技术栈要求。不允许擅自引入未批准的第三方依赖，不允许改变已有的目录结构。

**一、 核心技术栈强制要求**
1. **前端 (Frontend)**: 严格使用 Nuxt 3 + Vue 3 (仅限 Composition API 和 `<script setup>` 语法)。
2. **样式 (Styling)**: 严格使用 Tailwind CSS (原子类)。**禁止**手写外部或内联的普通 CSS，除非是定义 Tailwind 无法覆盖的复杂动画或特定的伪元素。
3. **后端 (Backend)**: 严格使用 Java 17 + Spring Boot 3.x + MyBatis-Plus。
4. **前后端交互**: 前端请求必须使用 Nuxt 3 原生的 `useFetch` 或 `useAsyncData`（禁止手动引入 axios，除非是独立于 Nuxt 生命周期的特定脚本）。

**二、 前端目录结构约束 (Nuxt 3 标准)**
你的代码生成必须严格放置在以下约定目录中：
- `pages/` : 页面级组件。采用基于文件的路由系统。
- `components/` : 可复用的 UI 组件。内部可按照业务域细分（如 `components/forum/` 或 `components/charts/`）。
- `layouts/` : 全局布局组件（如带有导航栏和底部的 `default.vue`）。
- `composables/` : 组合式函数，存放所有前端全局状态（`useState`）和可复用的业务逻辑（如 `useUser.ts`, `useAuth.ts`）。
- `assets/` : 存放全局样式（如 `tailwind.css`）和静态资源。
- `types/` : 存放 TypeScript 的全局接口定义（`d.ts`），所有的 VO/DTO 必须在这里定义类型，确保类型安全。

**三、 后端目录结构约束 (Spring Boot DDD 分层标准)**
严格遵循经典的 Controller -> Service -> Mapper 分层架构：
- `controller/` : 仅负责参数校验、HTTP 协议处理和路由转发，禁止包含任何业务逻辑。
- `service/` & `service/impl/` : 存放核心业务逻辑，事务注解 `@Transactional` 必须加在 Service 层。
- `mapper/` : MyBatis-Plus 的数据访问层，禁止在代码里拼接 SQL，复杂查询必须写在对应的 `*Mapper.xml` 中。
- `model/entity/` : 数据库表直接映射的实体类，必须使用 Lombok 注解。
- `model/dto/` : 数据传输对象，用于接收前端传来的参数。
- `model/vo/` : 视图对象，用于向前端返回脱敏和格式化后的数据（**禁止直接将 Entity 暴露给 Controller 返回**）。

**四、 UI/UX 设计规范红线 (极简新中式)**
- **颜色约束**: 主背景 `#FBF8F1`(白) 或 `#1A1412`(黑)。主点缀色 `#8B2B2B`(朱砂红)、`#D4AF37`(琉璃黄)。所有生成的组件必须只使用这几种颜色或它们的透明度变体。
- **排版约束**: 大标题必须使用 `font-serif tracking-widest`。
- **质感约束**: 弹窗、卡片和导航栏使用毛玻璃效果 `backdrop-blur-md` 和微阴影，拒绝粗硬的实线边框。

**五、 交互与防御性编程**
- 任何前端列表数据的获取，必须要有 `Loading` 骨架屏状态和 `Error` 容错状态兜底。
- 后端任何保存/修改操作，必须在 Controller 层通过 `@Valid` 进行参数校验，并通过全局异常处理器（GlobalExceptionHandler）返回统一的 `{code, message, data}` 格式。

**【AI 执行指令】**
了解以上项目全局约束后，在后续的每次代码生成中，你都必须先思考这段代码属于上述架构的哪一层，应该放在哪个目录下，再输出完整的代码实现。
--------------------------------------------------

