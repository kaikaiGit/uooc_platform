/**
 * AI聊天应用主要功能模块
 * 遵循SOLID原则，每个类和函数只负责单一职责
 */

// 应用配置常量
const CONFIG = {
    API_URL: "https://spark-api-open.xf-yun.com/v2/chat/completions",
    DEFAULT_API_KEY: "Bearer CjPbtFyHkOexDpDmuowR:HlhyHoIrUuSmqEQqzuQR",
    DEFAULT_MODEL: "x1",
    DEFAULT_TOP_K: 6,
    DEFAULT_SYSTEM_PROMPT: "你是一位知识渊博、幽默风趣的聊天助理。你擅长模仿鲁迅的口吻，用简洁明了的回答解决别人的问题。",
    MAX_MESSAGE_LENGTH: 2000,
    STORAGE_KEY: "ai_chat_data",
    TOAST_DURATION: 3000
};

/**
 * 本地存储管理器
 * 负责数据的持久化存储和检索
 */
class StorageManager {
    constructor() {
        this.storageKey = CONFIG.STORAGE_KEY;
    }

    /**
     * 获取存储的所有数据
     */
    getData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : this.getDefaultData();
        } catch (error) {
            console.error('获取存储数据失败:', error);
            return this.getDefaultData();
        }
    }

    /**
     * 保存数据到本地存储
     */
    saveData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('保存数据失败:', error);
            return false;
        }
    }

    /**
     * 获取默认数据结构
     */
    getDefaultData() {
        return {
            chatSessions: [],
            currentSessionId: null,
            settings: {
                apiKey: CONFIG.DEFAULT_API_KEY,
                topK: CONFIG.DEFAULT_TOP_K,
                systemPrompt: CONFIG.DEFAULT_SYSTEM_PROMPT,
                autoSave: true
            }
        };
    }

    /**
     * 清除所有存储数据
     */
    clearData() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('清除数据失败:', error);
            return false;
        }
    }
}

/**
 * API通信管理器
 * 负责与AI服务的通信
 */
class APIManager {
    constructor(storageManager) {
        this.storageManager = storageManager;
    }

    /**
     * 发送消息到AI服务
     */
    async sendMessage(userMessage, messageHistory = []) {
        const settings = this.storageManager.getData().settings;
        
        try {
            const requestData = this.buildRequestData(userMessage, messageHistory, settings);
            const response = await this.makeAPIRequest(requestData, settings.apiKey);
            
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态: ${response.status}`);
            }
            
            const result = await response.json();
            return this.extractMessageContent(result);
        } catch (error) {
            console.error('API调用失败:', error);
            throw this.handleAPIError(error);
        }
    }

    /**
     * 构建API请求数据
     */
    buildRequestData(userMessage, messageHistory, settings) {
        const messages = [
            {
                role: "system",
                content: settings.systemPrompt
            },
            ...messageHistory.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            {
                role: "user",
                content: userMessage
            }
        ];

        return {
            model: CONFIG.DEFAULT_MODEL,
            messages: messages,
            top_k: settings.topK,
            stream: false
        };
    }

    /**
     * 发起API请求
     */
    async makeAPIRequest(data, apiKey) {
        const headers = {
            "Authorization": apiKey,
            "Content-Type": "application/json"
        };

        return fetch(CONFIG.API_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });
    }

    /**
     * 提取响应中的消息内容
     */
    extractMessageContent(result) {
        if (result.choices && result.choices[0] && result.choices[0].message) {
            return result.choices[0].message.content;
        }
        throw new Error('响应格式错误');
    }

    /**
     * 处理API错误
     */
    handleAPIError(error) {
        if (error.message.includes('401')) {
            return new Error('API密钥无效，请检查设置');
        } else if (error.message.includes('429')) {
            return new Error('请求过于频繁，请稍后再试');
        } else if (error.message.includes('网络')) {
            return new Error('网络连接失败，请检查网络');
        }
        return error;
    }
}

/**
 * 聊天会话管理器
 * 负责管理聊天会话和消息记录
 */
class ChatSessionManager {
    constructor(storageManager) {
        this.storageManager = storageManager;
    }

    /**
     * 创建新的聊天会话
     */
    createNewSession() {
        const data = this.storageManager.getData();
        const sessionId = this.generateSessionId();
        
        const newSession = {
            id: sessionId,
            title: '新对话',
            messages: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        data.chatSessions.unshift(newSession);
        data.currentSessionId = sessionId;
        
        if (data.settings.autoSave) {
            this.storageManager.saveData(data);
        }
        
        return newSession;
    }

    /**
     * 获取当前活动会话
     */
    getCurrentSession() {
        const data = this.storageManager.getData();
        
        if (!data.currentSessionId) {
            return this.createNewSession();
        }
        
        const session = data.chatSessions.find(s => s.id === data.currentSessionId);
        return session || this.createNewSession();
    }

    /**
     * 切换到指定会话
     */
    switchToSession(sessionId) {
        const data = this.storageManager.getData();
        const session = data.chatSessions.find(s => s.id === sessionId);
        
        if (session) {
            data.currentSessionId = sessionId;
            if (data.settings.autoSave) {
                this.storageManager.saveData(data);
            }
            return session;
        }
        
        return null;
    }

    /**
     * 添加消息到当前会话
     */
    addMessage(role, content) {
        const session = this.getCurrentSession();
        const message = {
            id: this.generateMessageId(),
            role: role,
            content: content,
            timestamp: new Date().toISOString()
        };

        session.messages.push(message);
        session.updatedAt = new Date().toISOString();
        
        // 更新会话标题
        if (session.messages.length === 1 && role === 'user') {
            session.title = content.substring(0, 30) + (content.length > 30 ? '...' : '');
        }

        const data = this.storageManager.getData();
        if (data.settings.autoSave) {
            this.storageManager.saveData(data);
        }

        return message;
    }

    /**
     * 获取所有聊天会话
     */
    getAllSessions() {
        const data = this.storageManager.getData();
        return data.chatSessions.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    /**
     * 删除指定会话
     */
    deleteSession(sessionId) {
        const data = this.storageManager.getData();
        data.chatSessions = data.chatSessions.filter(s => s.id !== sessionId);
        
        if (data.currentSessionId === sessionId) {
            data.currentSessionId = data.chatSessions.length > 0 ? data.chatSessions[0].id : null;
        }
        
        if (data.settings.autoSave) {
            this.storageManager.saveData(data);
        }
    }

    /**
     * 清空所有会话
     */
    clearAllSessions() {
        const data = this.storageManager.getData();
        data.chatSessions = [];
        data.currentSessionId = null;
        
        if (data.settings.autoSave) {
            this.storageManager.saveData(data);
        }
    }

    /**
     * 生成唯一的会话ID
     */
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * 生成唯一的消息ID
     */
    generateMessageId() {
        return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

/**
 * UI管理器
 * 负责界面的渲染和用户交互
 */
class UIManager {
    constructor(sessionManager) {
        this.sessionManager = sessionManager;
        this.elements = {};
        this.isLoading = false;
        this.init();
    }

    /**
     * 初始化UI元素引用
     */
    init() {
        this.elements = {
            // 主要容器
            welcomeMessage: document.getElementById('welcomeMessage'),
            messagesContainer: document.getElementById('messagesContainer'),
            chatHistoryList: document.getElementById('chatHistoryList'),
            
            // 输入相关
            messageInput: document.getElementById('messageInput'),
            sendBtn: document.getElementById('sendBtn'),
            charCount: document.getElementById('charCount'),
            
            // 按钮
            newChatBtn: document.getElementById('newChatBtn'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn'),
            exportHistoryBtn: document.getElementById('exportHistoryBtn'),
            settingsBtn: document.getElementById('settingsBtn'),
            closeSettingsBtn: document.getElementById('closeSettingsBtn'),
            
            // 设置面板
            settingsPanel: document.getElementById('settingsPanel'),
            apiKeyInput: document.getElementById('apiKeyInput'),
            topKSlider: document.getElementById('topKSlider'),
            topKValue: document.getElementById('topKValue'),
            systemPromptInput: document.getElementById('systemPromptInput'),
            autoSaveToggle: document.getElementById('autoSaveToggle'),
            
            // 加载和通知
            loadingOverlay: document.getElementById('loadingOverlay'),
            toast: document.getElementById('toast')
        };

        this.bindEvents();
        this.loadInitialData();
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 输入框事件
        this.elements.messageInput.addEventListener('input', () => this.handleInputChange());
        this.elements.messageInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // 按钮点击事件
        this.elements.sendBtn.addEventListener('click', () => this.handleSendMessage());
        this.elements.newChatBtn.addEventListener('click', () => this.handleNewChat());
        this.elements.clearHistoryBtn.addEventListener('click', () => this.handleClearHistory());
        this.elements.exportHistoryBtn.addEventListener('click', () => this.handleExportHistory());
        this.elements.settingsBtn.addEventListener('click', () => this.toggleSettings());
        this.elements.closeSettingsBtn.addEventListener('click', () => this.toggleSettings());
        
        // 设置面板事件
        this.elements.topKSlider.addEventListener('input', () => this.updateTopKValue());
        
        // 快速操作按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const prompt = e.target.getAttribute('data-prompt');
                this.elements.messageInput.value = prompt;
                this.handleInputChange();
                this.handleSendMessage();
            }
        });
    }

    /**
     * 加载初始数据
     */
    loadInitialData() {
        this.loadSettings();
        this.renderChatHistory();
        this.renderCurrentSession();
    }

    /**
     * 加载设置数据
     */
    loadSettings() {
        const data = this.sessionManager.storageManager.getData();
        const settings = data.settings;
        
        this.elements.apiKeyInput.value = settings.apiKey;
        this.elements.topKSlider.value = settings.topK;
        this.elements.topKValue.textContent = settings.topK;
        this.elements.systemPromptInput.value = settings.systemPrompt;
        this.elements.autoSaveToggle.checked = settings.autoSave;
    }

    /**
     * 保存设置
     */
    saveSettings() {
        const data = this.sessionManager.storageManager.getData();
        
        data.settings = {
            apiKey: this.elements.apiKeyInput.value,
            topK: parseInt(this.elements.topKSlider.value),
            systemPrompt: this.elements.systemPromptInput.value,
            autoSave: this.elements.autoSaveToggle.checked
        };
        
        this.sessionManager.storageManager.saveData(data);
        this.showToast('设置已保存', 'success');
    }

    /**
     * 处理输入框变化
     */
    handleInputChange() {
        const input = this.elements.messageInput;
        const length = input.value.length;
        
        // 更新字符计数
        this.elements.charCount.textContent = `${length}/${CONFIG.MAX_MESSAGE_LENGTH}`;
        
        // 启用/禁用发送按钮
        this.elements.sendBtn.disabled = length === 0 || length > CONFIG.MAX_MESSAGE_LENGTH || this.isLoading;
        
        // 自动调整高度
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    }

    /**
     * 处理键盘事件
     */
    handleKeyDown(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            this.handleSendMessage();
        }
    }

    /**
     * 处理发送消息
     */
    async handleSendMessage() {
        const message = this.elements.messageInput.value.trim();
        
        if (!message || this.isLoading) {
            return;
        }

        try {
            this.setLoading(true);
            this.hideWelcomeMessage();
            
            // 添加用户消息
            this.addMessageToUI('user', message);
            this.sessionManager.addMessage('user', message);
            
            // 清空输入框
            this.elements.messageInput.value = '';
            this.handleInputChange();
            
            // 显示AI思考中
            const thinkingMessage = this.addThinkingIndicator();
            
            // 获取消息历史
            const session = this.sessionManager.getCurrentSession();
            const messageHistory = session.messages.slice(-10); // 只取最近10条消息
            
            // 调用API
            const apiManager = new APIManager(this.sessionManager.storageManager);
            const aiResponse = await apiManager.sendMessage(message, messageHistory);
            
            // 移除思考指示器
            this.removeThinkingIndicator(thinkingMessage);
            
            // 添加AI回复
            this.addMessageToUI('assistant', aiResponse);
            this.sessionManager.addMessage('assistant', aiResponse);
            
            // 更新侧边栏
            this.renderChatHistory();
            
        } catch (error) {
            this.removeThinkingIndicator();
            this.showToast(error.message, 'error');
        } finally {
            this.setLoading(false);
        }
    }

    /**
     * 添加消息到UI
     */
    addMessageToUI(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = role === 'user' ? '我' : 'AI';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = content;
        
        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = this.formatTime(new Date());
        
        messageContent.appendChild(bubble);
        messageContent.appendChild(time);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.elements.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    /**
     * 添加思考指示器
     */
    addThinkingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message assistant thinking';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = 'AI';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        
        bubble.appendChild(typingIndicator);
        messageContent.appendChild(bubble);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.elements.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        return messageDiv;
    }

    /**
     * 移除思考指示器
     */
    removeThinkingIndicator(element = null) {
        if (element) {
            element.remove();
        } else {
            const thinkingElements = this.elements.messagesContainer.querySelectorAll('.thinking');
            thinkingElements.forEach(el => el.remove());
        }
    }

    /**
     * 渲染当前会话
     */
    renderCurrentSession() {
        const session = this.sessionManager.getCurrentSession();
        
        this.elements.messagesContainer.innerHTML = '';
        
        if (session.messages.length === 0) {
            this.showWelcomeMessage();
        } else {
            this.hideWelcomeMessage();
            session.messages.forEach(message => {
                this.addMessageToUI(message.role, message.content);
            });
        }
    }

    /**
     * 渲染聊天历史
     */
    renderChatHistory() {
        const sessions = this.sessionManager.getAllSessions();
        const currentSessionId = this.sessionManager.getCurrentSession().id;
        
        this.elements.chatHistoryList.innerHTML = '';
        
        sessions.forEach(session => {
            const itemDiv = document.createElement('div');
            itemDiv.className = `chat-history-item ${session.id === currentSessionId ? 'active' : ''}`;
            itemDiv.onclick = () => this.switchToSession(session.id);
            
            const title = document.createElement('div');
            title.className = 'chat-history-title';
            title.textContent = session.title;
            
            const time = document.createElement('div');
            time.className = 'chat-history-time';
            time.textContent = this.formatRelativeTime(new Date(session.updatedAt));
            
            itemDiv.appendChild(title);
            itemDiv.appendChild(time);
            
            this.elements.chatHistoryList.appendChild(itemDiv);
        });
    }

    /**
     * 切换会话
     */
    switchToSession(sessionId) {
        this.sessionManager.switchToSession(sessionId);
        this.renderCurrentSession();
        this.renderChatHistory();
    }

    /**
     * 显示/隐藏欢迎消息
     */
    showWelcomeMessage() {
        this.elements.welcomeMessage.style.display = 'flex';
    }

    hideWelcomeMessage() {
        this.elements.welcomeMessage.style.display = 'none';
    }

    /**
     * 处理新建聊天
     */
    handleNewChat() {
        this.sessionManager.createNewSession();
        this.renderCurrentSession();
        this.renderChatHistory();
        this.showToast('已创建新对话', 'success');
    }

    /**
     * 处理清空历史
     */
    handleClearHistory() {
        if (confirm('确定要清空所有聊天记录吗？此操作不可撤销。')) {
            this.sessionManager.clearAllSessions();
            this.renderCurrentSession();
            this.renderChatHistory();
            this.showToast('聊天记录已清空', 'success');
        }
    }

    /**
     * 处理导出历史
     */
    handleExportHistory() {
        try {
            const sessions = this.sessionManager.getAllSessions();
            const exportData = {
                exportTime: new Date().toISOString(),
                sessions: sessions
            };
            
            const dataStr = JSON.stringify(exportData, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `ai-chat-history-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            
            URL.revokeObjectURL(url);
            this.showToast('对话记录已导出', 'success');
        } catch (error) {
            this.showToast('导出失败', 'error');
        }
    }

    /**
     * 切换设置面板
     */
    toggleSettings() {
        const isActive = this.elements.settingsPanel.classList.toggle('active');
        if (!isActive) {
            this.saveSettings();
        }
    }

    /**
     * 更新top_k值显示
     */
    updateTopKValue() {
        this.elements.topKValue.textContent = this.elements.topKSlider.value;
    }

    /**
     * 设置加载状态
     */
    setLoading(loading) {
        this.isLoading = loading;
        this.elements.loadingOverlay.classList.toggle('active', loading);
        this.handleInputChange(); // 更新发送按钮状态
    }

    /**
     * 显示Toast通知
     */
    showToast(message, type = 'info') {
        const toast = this.elements.toast;
        const messageSpan = toast.querySelector('.toast-message');
        
        messageSpan.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, CONFIG.TOAST_DURATION);
    }

    /**
     * 滚动到底部
     */
    scrollToBottom() {
        setTimeout(() => {
            this.elements.messagesContainer.scrollTop = this.elements.messagesContainer.scrollHeight;
        }, 100);
    }

    /**
     * 格式化时间
     */
    formatTime(date) {
        return date.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * 格式化相对时间
     */
    formatRelativeTime(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return '刚刚';
        if (minutes < 60) return `${minutes}分钟前`;
        if (hours < 24) return `${hours}小时前`;
        if (days < 7) return `${days}天前`;
        
        return date.toLocaleDateString('zh-CN');
    }
}

/**
 * 应用主类
 * 负责协调各个管理器的工作
 */
class AIChat {
    constructor() {
        this.storageManager = new StorageManager();
        this.sessionManager = new ChatSessionManager(this.storageManager);
        this.uiManager = new UIManager(this.sessionManager);
        
        // 全局错误处理
        window.addEventListener('error', (e) => {
            console.error('全局错误:', e.error);
            this.uiManager.showToast('应用出现错误，请刷新页面', 'error');
        });
        
        // 页面卸载时保存数据
        window.addEventListener('beforeunload', () => {
            this.uiManager.saveSettings();
        });
    }
}

// 应用初始化
document.addEventListener('DOMContentLoaded', () => {
    try {
        new AIChat();
    } catch (error) {
        console.error('应用初始化失败:', error);
        alert('应用启动失败，请刷新页面重试');
    }
}); 