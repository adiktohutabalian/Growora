import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getLevelColor, getLevelLabel } from "@/lib/utils";
import type { UserSkill, Skill } from "@/lib/types";

interface SkillBadgesProps {
  skillsTeach: UserSkill[];
  skillsLearn: Skill[];
}

export default function SkillBadges({
  skillsTeach,
  skillsLearn,
}: SkillBadgesProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Skills I Can Teach */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Skills I Can Teach
        </h3>
        <div className="space-y-3">
          {skillsTeach.map((us) => (
            <div
              key={us.skill.id}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div>
                <p className="font-medium text-gray-900">{us.skill.name}</p>
                {us.description && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {us.description}
                  </p>
                )}
              </div>
              <Badge className={getLevelColor(us.level)}>
                {getLevelLabel(us.level)}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Skills I Want To Learn */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Skills I Want To Learn
        </h3>
        <div className="space-y-3">
          {skillsLearn.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <span className="text-emerald-600 text-sm font-semibold">
                  {skill.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{skill.name}</p>
                <p className="text-sm text-gray-500">{skill.category}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
