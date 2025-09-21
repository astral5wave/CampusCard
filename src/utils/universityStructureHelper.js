import { universityStructure } from "./universityStructure";

export function getSchools() {
    const schools = Object.keys(universityStructure);
    return schools;
}
export function getSchoolAcronym(school) {
    const acr = universityStructure[school]?.acronym || null;
    return acr;
}

export function getDepartments(school) {
    const departments = Object.keys(universityStructure[school]?.departments|| {});
    return departments;
}

export function getDepartmentAcronym(school, department) {
    const acr = universityStructure[school]?.departments[department]|| null;
    return acr;
}