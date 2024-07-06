import type { CodeItem, TreeNode } from 'lib/types';

export function listToTree(list: CodeItem[]): TreeNode[] {
    const map = new Map<string, TreeNode>();
    const roots: TreeNode[] = [];

    // 첫 번째 항목의 codeParentId를 루트 식별자로 사용
    const rootParentId = list[0]?.codeParentId ?? null;

    // 모든 노드를 맵에 추가하고 children 배열 초기화
    list.forEach((item) => {
        const node: TreeNode = { ...item, children: [] };
        map.set(item.codeId, node);
    });

    // 트리 구조 생성
    list.forEach((item) => {
        const node = map.get(item.codeId)!;
        if (item.codeParentId !== rootParentId) {
            const parent = map.get(item.codeParentId!);
            if (parent) {
                parent.children.push(node);
            } else {
                roots.push(node);
            }
        } else {
            roots.push(node);
        }
    });

    return roots;
}

export function parseCustomText(node: TreeNode): void {
    if (node.codeCustomText) {
        try {
            node.codeCustomText = JSON.parse(node.codeCustomText);
        } catch (_) {
            // JSON 파싱에 실패한 경우 원래 문자열을 유지
        }
    }
    node.children.forEach(parseCustomText);
}
