import type { CodeItem, TreeNode } from "lib/types";
import { cloneDeep } from "lib/utility/cloneDeep";
import { isArray } from "lib/guard";

export function listToTree(list: CodeItem[]): TreeNode[] {
    if (!isArray(list)) return [];
    if (list.length === 0) return [];

    const cloneList = cloneDeep(list);
    const map = Object.create(null) as Record<string, TreeNode>;

    const roots: TreeNode[] = [];

    // 첫 번째 항목의 codeParentId를 루트 식별자로 사용
    const rootParentId = cloneList.length > 0 ? cloneList[0].codeParentId : null;

    // 모든 노드를 맵에 추가하고 children 배열 초기화
    for (let i = 0; i < cloneList.length; i++) {
        const item = cloneList[i];
        const node: TreeNode = { ...item, children: [] };
        map[item.codeId] = node;
    }

    // 트리 구조 생성
    for (let i = 0; i < cloneList.length; i++) {
        const item = cloneList[i];
        const node = map[item.codeId];

        if (item.codeParentId !== rootParentId) {
            const parent = map[item.codeParentId!];
            if (parent) {
                parent.children.push(node);
            } else {
                roots.push(node);
            }
        } else {
            roots.push(node);
        }
    }

    return roots;
}
