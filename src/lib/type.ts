export type Student = {
  id: string;
  name: string;
  gender: Gender;

  address: string;
  collegeName: string;
  branchName: string;

  DOB: Date;

  mobile: string;
  alternateMobile?: string;

  email: string;

  fatherName?: string;
  fatherContact?: string;
  fatherOccupation?: string;

  motherName?: string;
  motherContact?: string;
  motherOccupation?: string;

  admissionDate: Date;

  status: StudentStatus;
  isDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;

  batchId: string;

  certificates: Certificate[];
  enquiries: Enquiry[];
  enrollments: Enrollment[];
  feePayments: FeePayment[];
  feeStructure?: FeeStructure;
  attendance: StudentAttendance[];

  batch: Batch;
  course: Course[];
};

export enum StudentStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  DROPPED = "DROPPED",
  SUSPENDED = "SUSPENDED",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

// Certificate
export type Certificate = {
  id: string;

  certificateNumber: string;
  verificationHash: string;

  studentId: string;
  courseId: string;
  enrollmentId: string;
  batchId: string;
  templateId: string;

  issueDate: string;
  completionDate: string;

  grade: string;

  remarks?: string;

  revokedReason?: string;
  revokedAt?: string;

  generatedBy: string;

  pdfUrl?: string;

  createdAt: string;
  updatedAt: string;

  isActive: boolean;
  isDeleted: boolean;

  batch: Batch;
  course: Course;
  enrollment: Enrollment;
  student: Student;
  template: CertificateTemplate;
};

export type CertificateTemplate = {
  id: string;

  name: string;

  description?: string;

  pdfTemplateURL?: string;

  htmlContent?: string;

  isActive: boolean;

  isDeleted: boolean;

  createdAt: string;

  updatedAt: string;

  certificates: Certificate[];
};

// Teacher
export type Teacher = {
  id: string;

  name: string;

  phone: string;

  alternatePhone?: string;

  email: string;

  professionalEmail?: string;

  qualification: string;

  salaryAmount: number;

  joiningDate: string;

  status: TeacherStatus;

  code: string;

  isActive: boolean;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;

  batches: Batch[];
};

export enum TeacherStatus {
  FULL_TIME = "FULL_TIME",
  DOUBT_TEACHER = "Doubt_TEACHER",
}

// Inquiry
export type Enquiry = {
  id: string;

  studentName: string;

  gender: Gender;

  address: string;

  collegeName: string;
  branchName: string;

  DOB: string;

  mobile: string;
  alternateMobile?: string;

  email: string;

  dateOfEnquiry: string;

  fatherName?: string;
  fatherContact?: string;
  fatherOccupation?: string;

  motherName?: string;
  motherContact?: string;
  motherOccupation?: string;

  source?: EnquirySource;

  status: EnquiryStatus;

  followUpDate?: string;

  remarks?: string;

  isActive: boolean;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;

  studentId?: string;

  assignedToId: string;

  assignedTo: Employee;

  student?: Student;

  followUps: EnquiryFollowUp[];

  courses: Course[];
};

export enum EnquiryStatus {
  NEW = "NEW",
  FOLLOW_UP = "FOLLOW_UP",
  CONVERTED = "CONVERTED",
  LOST = "LOST",
}

export enum EnquirySource {
  WALK_IN = "WALK_IN",
  INSTAGRAM = "INSTAGRAM",
  FACEBOOK = "FACEBOOK",
  GOOGLE = "GOOGLE",
  REFERRAL = "REFERRAL",
}

// Branch
export type Branch = {
  id: string;

  name: string;

  address?: string;

  contact: string;

  email: string;

  professionalEmail?: string;

  description?: string;

  headId?: string;

  isActive: boolean;

  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;

  head?: Employee;

  employees: Employee[];

  expenses: Expense[];
};

// Course
export type Course = {
  id: string;

  title: string;
  duration: number;

  descriptionInDetail?: string;
  descriptionInShort: string;

  imageForThumbnail?: string;

  roadmap?: string;

  totalFees: number;
  offeredFees?: number;

  instractionMode?: string;

  isActive: boolean;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;

  certificates: Certificate[];
  batches: Batch[];
  enrollments: Enrollment[];
  enquiries: Enquiry[];
  students: Student[];
};

// Employee
export type Employee = {
  id: string;

  name: string;

  DOB: string;

  gender: Gender;

  mobile: string;

  alternateMobile?: string;

  email: string;

  professionalEmail?: string;

  password: string;

  adharNumber: string;

  panId?: string;

  resumeURL: string;

  photoURL?: string;

  bankAccountNumber: string;

  bankHolderName: string;

  bankName: string;

  IFSCCode: string;

  baseSalary: number;

  fatherName?: string;
  fatherContact?: string;

  motherName?: string;
  motherContact?: string;

  emergencyContact?: string;

  role: EmployeeRole;

  empCode: string;

  isActive: boolean;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;

  branchId?: string;
  managerId?: string;

  branches: Branch[];

  branch?: Branch;

  manager?: Employee;

  employees: Employee[];

  assignedEnquiries: Enquiry[];
};

export enum EmployeeRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  TECH = "TECH",
  ADVERSE = "ADVERSE",
  SALES = "SALES",
}

// EnquiryFollowUp
export type EnquiryFollowUp = {
  id: string;

  notes?: string;

  followUpDate: string;

  nextFollowUpDate?: string;

  createdBy?: string;

  createdAt: string;

  isDeleted: boolean;

  isActive: boolean;

  enquiryId: string;

  enquiry: Enquiry;
};

// Enrollment
export type Enrollment = {
  id: string;

  enrollmentDate: string;

  studentId: string;
  courseId: string;
  batchId: string;

  status: StudentStatus;

  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;

  paidAmount: number;

  certificates: Certificate[];

  batch: Batch;
  course: Course;
  student: Student;

  feeStructure?: FeeStructure;

  studentAttendances: StudentAttendance[];
};

//  Expense
export type Expense = {
  id: string;

  title: string;

  amount: number;

  expenseDate: string;

  description?: string;

  notes?: string;

  paymentMode: PaymentMode;

  createdAt: string;

  updatedAt: string;

  isActive: boolean;

  isDeleted: boolean;

  branchId: string;

  categoryId: string;

  branch: Branch;

  category: ExpenseCategory;
};

export type ExpenseCategory = {
  id: string;

  name: string;

  description?: string;

  createdAt: string;

  updatedAt: string;

  isActive: boolean;

  isDeleted: boolean;

  expenses: Expense[];
};

// FeeInstallment
export type FeeInstallment = {
  id: string;

  dueDate: string;

  amount: number;

  status: InstallmentStatus;

  createdAt: string;
  updatedAt: string;

  feeStructureId: string;

  feeStructure: FeeStructure;

  reminders: FeeReminder[];

  paymentAllocations: PaymentAllocation[];
};

export enum InstallmentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
}

// FeePayment
export type FeePayment = {
  id: string;

  totalAmount: number;

  paymentMode: PaymentMode;

  status: PaymentStatus;

  transactionRef?: string;

  note?: string;

  paidDate: string;

  createdAt: string;

  studentId: string;

  festructureId: string;

  feeStructure: FeeStructure;

  student: Student;

  paymentAllocations: PaymentAllocation[];
};

export enum PaymentMode {
  CASH = "CASH",
  UPI = "UPI",
  MIXED = "MIXED",
}
export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

// FeeReminder
export type FeeReminder = {
  id: string;

  reminderDate: string;

  reminderType: string;

  status: string;

  createdAt: string;

  installmentId: string;

  installment: FeeInstallment;
};

// FeeStructure
export type FeeStructure = {
  id: string;

  courseTotalFee: number;

  discountType?: DiscountType;
  discountValue?: number;
  discountAmount?: number;

  finalFee: number;

  emiOption: boolean;

  enrollmentId: string;
  studentId: string;

  createdAt: string;
  updatedAt: string;

  isActive: boolean;
  isDeleted: boolean;

  installments: FeeInstallment[];
  feePayments: FeePayment[];

  enrollment: Enrollment;
  student: Student;
};

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
}

// PaymentAllocation
export type PaymentAllocation = {
  id: string;

  amount: number;

  createdAt: string;
  updatedAt: string;

  feePaymentId: string;
  installmentId: string;

  feePayment: FeePayment;
  installment: FeeInstallment;
};

// StudentAttendance
export type StudentAttendance = {
  id: string;

  date: string;

  status: StudentAttendanceStatus;

  createdAt: string;

  isActive: boolean;

  isDeleted: boolean;

  studentId: string;

  batchId: string;

  enrollmentId: string;

  batch: Batch;

  enrollment: Enrollment;

  student: Student;
};

export enum StudentAttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
}

// Batch
export type Batch = {
  id: string;
  name: string;
  capacity: number;
  startDate: string;
  endDate: string;
  scheduleTime: string;
  roomNo?: string;
  batchCode: string;
  status: BatchStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  courseId: string;
  teacherId: string;
  certificates: Certificate[];
  course: Course;
  teacher: Teacher;
  enrollments: Enrollment[];
  studentAttendances: StudentAttendance[];
  students: Student[];
};

export enum BatchStatus {
  STARTED = "STARTED",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}
