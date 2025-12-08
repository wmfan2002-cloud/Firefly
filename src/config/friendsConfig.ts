import type { FriendLink } from "../types/config";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链配置
export const friendsConfig: FriendLink[] = [
	// 在这里添加你们的友情链接
	// 示例：
	// {
	// 	title: "朋友的博客",
	// 	imgurl: "头像URL",
	// 	desc: "描述",
	// 	siteurl: "https://example.com",
	// 	tags: ["Blog"],
	// 	weight: 10,
	// 	enabled: true,
	// },
];

// 获取启用的友链并按权重排序
export const getEnabledFriends = (): FriendLink[] => {
	return friendsConfig
		.filter((friend) => friend.enabled)
		.sort((a, b) => b.weight - a.weight); // 按权重降序排序
};
