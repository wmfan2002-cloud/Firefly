import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
	title: "公告", // 公告标题
	content: "欢迎来到我们的旅行日记！记录每一段美好旅程 ✈️", // 公告内容
	closable: true, // 允许用户关闭公告
	link: {
		enable: true, // 启用链接
		text: "关于我们", // 链接文本
		url: "/about/", // 链接 URL
		external: false, // 内部链接
	},
};
