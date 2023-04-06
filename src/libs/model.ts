interface ITabBarCommon {
  label: string
  value: number
  name: string
}

type IRole = 0 | 1 | 2

// -1 -- 损坏 0 -- 闲置 1 -- 在用
type IEquipmentState = -1 | 0 | 1

interface ILoginValues {
  role: IRole
  username: string
  password: string
}

interface IInfo {
  avatar: string
  createTime: string
  email: string
  id: string
  name: string
  phoneNumber: string
  resume: string
  username: string
}

interface IStu {
  avatar: string | null
  createdTime: Date
  email: string
  id: string
  name: string
  phoneNumber: string | null
  resume: string | null
  teacherId: string
  username: string
}

interface IStuList extends IPagination {
  list: IStu[]
}

interface IDevice {
  key: string
  id: string
  createdTime: string
  serialNumber: string
  name: string
  version: string
  originalValue: string
  performanceIndex: string
  address: string
  state: IEquipmentState
  warehouseEntryTime: string
  recipient: string
  HostRemarks: string
  remark: string
}

interface IEquipmentList extends IPagination {
  lists: IDevice[]
}

interface IResStu {
  id: string
  name: string
  username: string
}

interface IOption {
  value: string
  label: string
}

interface IApplyInfo {
  id: string
  applyState: typeIApplyState
  startTime: Date
  endTime: Date
  apply_reason: string
  refuseReason: string
  createdTime: Date
  serialNumber: string
  name: string
  performanceIndex: string
  address: string
}

interface IApplyInfoSingle {
  applyState: typeIApplyState
  apply_reason: string
  createdTime: Date
  endTime: Date
  startTime: Date
  equipment_name: string
  serialNumber: string
  id: string
  equipmentId: string
  studentId: string
  username: string
  studentName: string
}

// 设备申请状态  0 -- 申请中  1 -- 申请同意 -1 -- 申请被拒绝
type typeIApplyState = -1 | 0 | 1

interface ILoadInfo {
  HostRemarks: string
  address: string
  applyId: string
  endTime: Date
  equipmentId: string
  name: string
  performanceIndex: string
  serialNumber: string
  startTime: Date
  version: string
}

interface IPart {
  type: 'progress' | 'plan' | 'teamService'
  id: string
  title: string
  point: IPoint[]
}

interface IPoint {
  id: string
  title: string
  text: IText[]
}

interface IText {
  id: string
  content: string
}

// 会议状态 -1(结束) 0(进行中) 1(未开始)
type IMeetingState = -1 | 0 | 1

interface ISponsor {
  id: string
  name: string
  role: IRole
  trueId: string
  username: string
}

interface IRcord {
  id: string
  createdTime: Date
  participant: IParticipant
}

interface IParticipant {
  id: string
  name: string
  role: IRole
  trueId: string
  username: string
}

interface IMeetingInfo {
  address: string
  briefContent: string
  createdTime: Date
  endTime: Date
  id: string
  materials: string
  meetState: IMeetingState
  startTime: Date
  title: string
  sponsor: ISponsor
  records: IRcord[]
}

interface IHistoryReport {
  createdTime: Date
  time: string
  id: string
  text: IPart[]
  pdf: string
}

interface IUser {
  id: string
  name: string
  role: IRole
  trueId: string
  username: string
}

interface ITeacherReport extends IHistoryReport {
  reportState: IReportState
  report_submitter: IUser
}

interface INewInfo {
  key: string
  userId: string
  name: string
  username: string
  timeRange: string
  createTime: string
  status: IReportState
  text: IPart[]
  pdf: string
}
// 周报状态 -1 -- 未查看     0 --- 查看了但没回复  1 --- 查看了并回复了
type IReportState = -1 | 0 | 1

interface IFirstComment {
  commentContent: string
  createdTime: Date
  id: string
  comment_user: IUser
  comment_reply_user: IUser
}

interface ISecondComment {
  id: string
  secondComment: string
  createdTime: Date
  comment_reply_user: IUser
  comment_user: IUser
}

// 分页
interface IPagination {
  pageNum: number
  pageSize: number
  total: number
}

// 请假状态 -1 -- 审核中  0 -- 申请通过 1 -- 申请拒绝
type IRequestState = -1 | 0 | 1

interface IRequest {
  id: string
  reason: string
  startTime: Date
  endTime: Date
  requestState: IRequestState
  materials: string
  createdTime: Date
  endStartTime: Date
  endEndTime: Date
  isUpdate: boolean
}

interface IRequestInfo extends IPagination {
  requests: IRequest[]
}

interface IRequestList {
  key: string
  startTime: Date
  endTime: Date
  endStartTime: Date
  endEndTime: Date
  reason: string
  material: string
  isUpdate: boolean
  status: IRequestState
}

// 报销状态 -1 --- 审核中 0 -- 通过  1 -- 拒绝
type IReimbersementState = -1 | 0 | 1

interface IApply {
  affairReason: string
  amount: number
  applyUser: IUser
  createdTime: Date
  credential: string
  id: string
  invoice: string
  reimbursementState: IReimbersementState
}

interface IPatent {
  id: string
  name: string
  applicationNumber: string
  applicationDate: Date
  publicationNumber: string
  openDay: Date
  principalClassificationNumber: string
  patentRight: string
  inventor: string
  digest: string
  patentState: IProductionState
  patentExist: IProductionExist
  createdTime: Date
}

interface IThesis {
  id: string
  title: string
  firstAuthor: string
  publishDate: Date
  publicationName: string
  signature: string
  discipline_one: string
  thesisState: IProductionState
  thesisExist: IProductionExist
  createdTime: Date
}

interface ICopyRight {
  id: string
  registerNumber: string
  name: string
  category: string
  copyrightOwner: string
  creationCompletionDate: Date
  firstPublicationDate: Date
  recordDate: Date
  copyRightState: IProductionState
  copyRightExist: IProductionExist
  createdTime: Date
}

interface IWin {
  id: string
  name: string
  awardGrade: string
  awardLevel: string
  awardTime: Date
  organizingCommittee: string
  winState: IProductionState
  winExist: IProductionExist
  createdTime: Date
}

// 老师模块
type ITeacherModule = 'device' | 'meeting' | 'reimbursement'

// 学生模块
type IStudentModule = 'meeting'
| 'report'
| 'reimbursement'
| 'request'
| 'production'
| 'project'

// production 状态/
// 存在状态 -1未审批 0审批通过 1审批打回
// 0不存在 1存在
type IProductionState = -1 | 0 | 1
type IProductionExist = 0 | 1

interface ITPatent extends IPatent {
  applyPatentUser: IUser
}

interface ITThesis extends IThesis {
  applyThesisUser: IUser
}

interface ITCopyright extends ICopyRight {
  applyCopyRightUser: IUser
}

interface ITWin extends IWin {
  applyWinUser: IUser
}
type IProduction = 'patent' | 'thesis' | 'copyright' | 'winning'
type ITProductionInfo = ITPatent[] | ITThesis[] | ITCopyright[] | ITWin[]

// -1未审批 0审批通过可进入跟踪 1审批未通过 2已结项
type IProjectState = -1 | 0 | 1 | 2
type IProjectExist = 0 | 1

interface IProgress {
  id: string
  researchProgress: string
  nextPlan: string
  fundPlan: string
  clarification: string
  createdTime: Date
}

export type {
  IStuList,
  IStu,
  IInfo,
  ILoginValues,
  IRole,
  ITabBarCommon,
  IEquipmentState,
  IDevice,
  IEquipmentList,
  IResStu,
  IOption,
  typeIApplyState,
  IApplyInfo,
  IApplyInfoSingle,
  ILoadInfo,
  IPart,
  IMeetingInfo,
  IMeetingState,
  IHistoryReport,
  ITeacherReport,
  INewInfo,
  IReportState,
  IFirstComment,
  ISecondComment,
  IRequestInfo,
  IRequestList,
  IRequestState,
  IPagination,
  IUser,
  IReimbersementState,
  IApply,
  ITeacherModule,
  IStudentModule,
  IPatent,
  IThesis,
  ICopyRight,
  IProductionState,
  IProductionExist,
  IWin,
  ITPatent,
  ITThesis,
  ITCopyright,
  ITWin,
  ITProductionInfo,
  IProduction,
  IProjectState,
  IProjectExist,
  IProgress
}
