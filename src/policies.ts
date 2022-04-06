const policyList = {
    superAdminPolicy: ['superAdmin'],
    adminPolicy: ['superAdmin', 'admin'],
    studentPolicy: ['superAdmin', 'admin', 'student'],
    teacherPolicy: ['superAdmin', 'admin', 'teacher'],
    publicPolicy: ['superAdmin', 'admin', 'manager', 'student', 'teacher'],
}

export default policyList;