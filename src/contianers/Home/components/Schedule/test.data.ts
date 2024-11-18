import { ISchedule } from "../../../../utils/types";

const schedules: ISchedule[] = [
  {
    id: "7a1cd7ee-2b23-4958-b82a-65be0d418208",
    schoolDay: "2024-11-17",
    startTime: "09:00",
    endTime: "10:30",
    limitNumber: 20,
    course: {
      id: "course-1234",
      name: "IELETS listening training",
      desc: "An engaging mathematics course for young learners.",
      group: "Ages 10-15",
      baseAbility: "Basic arithmetic skills",
      limitNumber: 30,
      duration: 90, // in minutes
      reserveInfo: "Reserve at least 2 days in advance.",
      refundInfo: "Refund available up to 1 day before the course.",
      otherInfo: "Bring your own calculator.",
      reducibleTime: [
        {
          week: "monday",
          orderTime: [
            { startTime: "09:00", endTime: "10:30", key: 1 },
            { startTime: "14:00", endTime: "15:30", key: 2 }
          ]
        },
        {
          week: "wednesday",
          orderTime: [
            { startTime: "10:00", endTime: "11:30", key: 3 }
          ]
        }
      ]
    },
    org: {
      id: "org-91011",
      name: "Bright Minds Academy",
      logo: "https://example.com/logo.jpg",
      tags: "Education, Math, Interactive",
      description: "A top-tier institution focused on engaging education.",
      address: "123 Learning Lane, Knowledge City",
      tel: "123-456-7890",
      longitude: "12.34567",
      latitude: "76.54321",
      identityCardBackImg: "https://example.com/id-back.jpg",
      identityCardFrontImg: "https://example.com/id-front.jpg",
      businessLicense: "https://example.com/license.jpg"
    },
    scheduleRecords: [
      {
        id: "record-1",
        status: "confirmed",
        student: {
          id: "student-1",
          name: "John Doe",
          tel: "123-456-7890",
          avatar: "https://water-drop-capstone.oss-us-west-1.aliyuncs.com/images/rc-upload-1728788161436-2.jpg",
          account: "john_doe123"
        }
      },
      {
        id: "record-2",
        status: "waiting",
        student: {
          id: "student-2",
          name: "Jane Smith",
          tel: "098-765-4321",
          avatar: "https://water-drop-capstone.oss-us-west-1.aliyuncs.com/images/rc-upload-1728789190794-2.jpg",
          account: "jane_smith456"
        }
      }
    ]
  },
  {
    id: "d22bd0dd-b59e-41aa-af9d-bb527aa85506",
    schoolDay: "2024-11-18",
    startTime: "11:00",
    endTime: "12:30",
    limitNumber: 25,
    course: {
      id: "course-5678",
      name: "CLIPIP Writing",
      desc: "A workshop focused on developing creative writing skills.",
      group: "Ages 12-18",
      baseAbility: "Basic writing and storytelling skills",
      limitNumber: 25,
      duration: 90, // in minutes
      reserveInfo: "Reserve at least 1 week in advance.",
      refundInfo: "No refunds after registration closes.",
      otherInfo: "All materials provided.",
      reducibleTime: [
        {
          week: "tuesday",
          orderTime: [
            { startTime: "11:00", endTime: "12:30", key: 1 }
          ]
        },
        {
          week: "thursday",
          orderTime: [
            { startTime: "13:00", endTime: "14:30", key: 2 }
          ]
        }
      ]
    },
    org: {
      id: "org-91012",
      name: "Literary Scholars Institute",
      logo: "https://example.com/logo2.jpg",
      tags: "Writing, Creativity, Workshop",
      description: "A creative hub for aspiring writers.",
      address: "456 Writers Way, Imagination Town",
      tel: "987-654-3210",
      longitude: "98.76543",
      latitude: "54.32109",
      identityCardBackImg: "https://example.com/id-back2.jpg",
      identityCardFrontImg: "https://example.com/id-front2.jpg",
      businessLicense: "https://example.com/license2.jpg"
    },
    scheduleRecords: [
      {
        id: "record-3",
        status: "confirmed",
        student: {
          id: "student-3",
          name: "Michael Brown",
          tel: "222-333-4444",
          avatar: "https://water-drop-capstone.oss-us-west-1.aliyuncs.com/images/rc-upload-1728921954646-15.jpg",
          account: "michael_brown789"
        }
      }
    ]
  }
];

export default schedules;