import axios from "axios";
import { SKILL_ENDPOINT } from "./config";

const axiosSkillInstance = axios.create({
    baseURL: SKILL_ENDPOINT,
    timeout: 5000,
    headers: { "X-Custom-Header": "foobar" },
});

export const getSkillById = async (skillId) => {
    try {
        const res = await axiosSkillInstance.get(`/${skillId}`);
        if (res) {
            return skillSnakeToCamel(res.data);
        }
        throw new Error("No data returned from backend");
    } catch (error) {
        console.log(error);
        return {};
    }
}

function skillSnakeToCamel(snakeCaseSkill) {
    return {
        skillId: snakeCaseSkill.skill_id,
        skillName: snakeCaseSkill.skill_name,
        skillDesc: snakeCaseSkill.skill_desc,
        isActive: snakeCaseSkill.is_active,
    };
}
