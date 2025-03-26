export type TreeNode = {
    id: string;
    name: string;
    children: TreeNode[];
    isExpanded?: boolean;
    text: string;
    isPopulated?: boolean;
    isParent?:boolean;
};