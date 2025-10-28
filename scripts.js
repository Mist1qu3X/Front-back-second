// Данные проектов
const projectsData = [
    {
        id: 1,
        title: "Личный сайт",
        description: "Разработка персонального веб-сайта с использованием HTML и CSS. Сайт включает в себя информацию обо мне, моих навыках и проектах.",
        technologies: ["HTML", "CSS"],
        category: "html",
        liveLink: "https://example.com",
        codeLink: "https://github.com/username/personal-website",
        images: ["assets/site.png"]
    },
    {
        id: 2,
        title: "Todo-приложение",
        description: "Интерактивное приложение для управления задачами с возможностью добавления, редактирования и удаления задач.",
        technologies: ["JavaScript", "HTML", "CSS"],
        category: "js",
        liveLink: "https://example.com/todo",
        codeLink: "https://github.com/username/todo-app",
        images: ["assets/todo.png"]
    },
    {
        id: 3,
        title: "Интернет-магазин",
        description: "Полнофункциональный интернет-магазин с корзиной покупок, системой фильтрации и оформлением заказа.",
        technologies: ["React", "JavaScript", "CSS"],
        category: "react",
        liveLink: "https://example.com/shop",
        codeLink: "https://github.com/username/ecommerce",
        images: ["assets/internet_shop.png"]
    },
    {
        id: 4,
        title: "Портфолио",
        description: "Адаптивный сайт-портфолио с использованием Bootstrap для демонстрации проектов и навыков.",
        technologies: ["Bootstrap", "HTML", "CSS"],
        category: "html",
        liveLink: "https://example.com/portfolio",
        codeLink: "https://github.com/username/portfolio",
        images: ["assets/portfolio.png"]
    },
    {
        id: 5,
        title: "Игра в память",
        description: "Игра на запоминание карточек с подсчетом очков и таймером. Разработана на чистом JavaScript.",
        technologies: ["JavaScript", "HTML", "CSS"],
        category: "js",
        liveLink: "https://example.com/memory",
        codeLink: "https://github.com/username/memory-game",
        images: ["assets/game.png"]
    },
    {
        id: 6,
        title: "Погодное приложение",
        description: "Приложение для просмотра погоды с использованием API и отображением данных в удобном формате.",
        technologies: ["React", "API", "CSS"],
        category: "react",
        liveLink: "https://example.com/weather",
        codeLink: "https://github.com/username/weather-app",
        images: ["assets/weather.png"]
    }
];

// Данные записей дневника - загружаем из sessionStorage или используем начальные
let diaryEntries = loadDiaryEntries();

function loadDiaryEntries() {
    const saved = sessionStorage.getItem('diaryEntries');
    if (saved) {
        return JSON.parse(saved);
    }
    // Начальные данные, если в sessionStorage ничего нет
    return [
        {
            id: 1,
            date: "2023-12-15",
            title: "Верстка макета сайта",
            description: "Завершил верстку главной страницы личного сайта с использованием HTML и CSS.",
            status: "completed"
        },
        {
            id: 2,
            date: "2023-12-10",
            title: "JavaScript основы",
            description: "Изучил основы JavaScript: переменные, функции, циклы и условия.",
            status: "completed"
        },
        {
            id: 3,
            date: "2023-12-05",
            title: "Работа с формами",
            description: "Начал изучать работу с формами в JavaScript, валидацию и обработку данных.",
            status: "in-progress"
        },
        {
            id: 4,
            date: "2023-12-01",
            title: "Адаптивный дизайн",
            description: "Изучаю принципы адаптивного дизайна и медиа-запросы для создания мобильных версий сайтов.",
            status: "in-progress"
        }
    ];
}

function saveDiaryEntries() {
    sessionStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация страницы проектов
    if (document.getElementById('projects-container')) {
        initProjectsPage();
    }
    
    // Инициализация страницы дневника
    if (document.getElementById('diary-entries')) {
        initDiaryPage();
    }
    
    // Инициализация страницы контактов
    if (document.getElementById('contactForm')) {
        initContactsPage();
    }
});

// Функции для страницы проектов
function initProjectsPage() {
    renderProjects();
    setupFilterButtons();
}

function renderProjects(filter = 'all') {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? projectsData 
        : projectsData.filter(project => project.category === filter);
    
    if (filteredProjects.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-folder-open fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">Проекты не найдены</h4>
                <p class="text-muted">Попробуйте выбрать другой фильтр</p>
            </div>
        `;
    } else {
        filteredProjects.forEach(project => {
            const projectCard = createProjectCard(project);
            container.appendChild(projectCard);
        });
    }
}

function createProjectCard(project) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    col.innerHTML = `
        <div class="card project-card-page h-100" data-project-id="${project.id}">
            <img src="${project.images[0]}" class="card-img-top project-image" alt="${project.title}">
            <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text">${project.technologies.join(', ')}</p>
            </div>
        </div>
    `;
    
    // Добавляем обработчик клика для открытия модального окна
    col.querySelector('.project-card-page').addEventListener('click', () => {
        openProjectModal(project);
    });
    
    return col;
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс к текущей кнопке
            this.classList.add('active');
            // Фильтруем проекты
            renderProjects(this.getAttribute('data-filter'));
        });
    });
}

function openProjectModal(project) {
    document.getElementById('projectModalTitle').textContent = project.title;
    
    const modalBody = document.getElementById('projectModalBody');
    modalBody.innerHTML = `
        <img src="${project.images[0]}" class="modal-image" alt="${project.title}">
        <p>${project.description}</p>
        <p><strong>Технологии:</strong> ${project.technologies.join(', ')}</p>
    `;
    
    document.getElementById('projectLiveLink').href = project.liveLink;
    document.getElementById('projectCodeLink').href = project.codeLink;
    
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}

// Функции для страницы дневника
function initDiaryPage() {
    renderDiaryEntries();
    setupDiaryForm();
    
    // Сбрасываем текст кнопки при открытии модального окна
    document.getElementById('addEntryModal').addEventListener('show.bs.modal', function() {
        document.getElementById('saveEntryBtn').textContent = 'Сохранить';
    });
}

function renderDiaryEntries() {
    const container = document.getElementById('diary-entries');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Сортируем записи по дате (от новых к старым)
    const sortedEntries = [...diaryEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedEntries.forEach(entry => {
        const entryElement = createDiaryEntry(entry);
        container.appendChild(entryElement);
    });
}

function createDiaryEntry(entry) {
    const entryDiv = document.createElement('div');
    entryDiv.className = `diary-entry ${entry.status}`;
    
    const statusText = getStatusText(entry.status);
    const statusClass = getStatusClass(entry.status);
    
    // Форматируем дату
    const formattedDate = formatDate(entry.date);
    
    entryDiv.innerHTML = `
        <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="mb-0">${entry.title}</h5>
            <span class="entry-status ${statusClass}">${statusText}</span>
        </div>
        <p class="text-muted mb-2">${formattedDate}</p>
        <p class="mb-0">${entry.description}</p>
        <div class="mt-2">
            <button class="btn btn-sm btn-outline-primary edit-entry me-2" data-entry-id="${entry.id}">
                <i class="fas fa-edit"></i> Редактировать
            </button>
            <button class="btn btn-sm btn-outline-danger delete-entry" data-entry-id="${entry.id}">
                <i class="fas fa-trash"></i> Удалить
            </button>
        </div>
    `;
    
    // Добавляем обработчик для кнопки удаления
    entryDiv.querySelector('.delete-entry').addEventListener('click', function() {
        deleteDiaryEntry(entry.id);
    });
    
    // Добавляем обработчик для кнопки редактирования
    entryDiv.querySelector('.edit-entry').addEventListener('click', function() {
        editDiaryEntry(entry.id);
    });
    
    return entryDiv;
}

function getStatusText(status) {
    switch(status) {
        case 'completed': return 'Завершено';
        case 'in-progress': return 'В процессе';
        case 'planned': return 'Запланировано';
        default: return '';
    }
}

function getStatusClass(status) {
    switch(status) {
        case 'completed': return 'status-completed';
        case 'in-progress': return 'status-in-progress';
        case 'planned': return 'status-planned';
        default: return '';
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

function setupDiaryForm() {
    document.getElementById('saveEntryBtn').addEventListener('click', saveDiaryEntry);
    
    // Устанавливаем сегодняшнюю дату по умолчанию
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('entryDate').value = today;
    
    // Добавляем обработчик для кнопки очистки
    const clearBtn = document.getElementById('clearDiaryBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите удалить все записи дневника?')) {
                diaryEntries = [];
                saveDiaryEntries();
                renderDiaryEntries();
                showNotification('Все записи удалены', 'success');
            }
        });
    }
}

function saveDiaryEntry() {
    const date = document.getElementById('entryDate').value;
    const title = document.getElementById('entryTitle').value;
    const description = document.getElementById('entryDescription').value;
    const status = document.getElementById('entryStatus').value;
    
    if (!date || !title || !description) {
        showNotification('Пожалуйста, заполните все поля', 'danger');
        return;
    }
    
    const newEntry = {
        id: diaryEntries.length > 0 ? Math.max(...diaryEntries.map(e => e.id)) + 1 : 1,
        date,
        title,
        description,
        status
    };
    
    diaryEntries.push(newEntry);
    saveDiaryEntries();
    renderDiaryEntries();
    
    // Закрываем модальное окно
    const modal = bootstrap.Modal.getInstance(document.getElementById('addEntryModal'));
    modal.hide();
    
    // Очищаем форму
    document.getElementById('diaryEntryForm').reset();
    
    // Устанавливаем сегодняшнюю дату по умолчанию
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('entryDate').value = today;
    
    showNotification('Запись успешно добавлена', 'success');
}

function deleteDiaryEntry(entryId) {
    if (confirm('Вы уверены, что хотите удалить эту запись?')) {
        diaryEntries = diaryEntries.filter(entry => entry.id !== entryId);
        saveDiaryEntries();
        renderDiaryEntries();
        showNotification('Запись удалена', 'success');
    }
}

function editDiaryEntry(entryId) {
    const entry = diaryEntries.find(e => e.id === entryId);
    if (!entry) return;
    
    // Заполняем форму данными записи
    document.getElementById('entryDate').value = entry.date;
    document.getElementById('entryTitle').value = entry.title;
    document.getElementById('entryDescription').value = entry.description;
    document.getElementById('entryStatus').value = entry.status;
    
    // Удаляем старую запись
    diaryEntries = diaryEntries.filter(e => e.id !== entryId);
    saveDiaryEntries();
    
    // Показываем модальное окно
    const modal = new bootstrap.Modal(document.getElementById('addEntryModal'));
    modal.show();
    
    // Меняем текст кнопки
    document.getElementById('saveEntryBtn').textContent = 'Обновить запись';
}

// Функции для страницы контактов
function initContactsPage() {
    document.getElementById('contactForm').addEventListener('submit', handleContactFormSubmit);
}

function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    // Простая валидация
    let isValid = true;
    
    if (!name) {
        document.getElementById('contactName').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('contactName').classList.remove('is-invalid');
    }
    
    if (!email || !isValidEmail(email)) {
        document.getElementById('contactEmail').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('contactEmail').classList.remove('is-invalid');
    }
    
    if (!message) {
        document.getElementById('contactMessage').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('contactMessage').classList.remove('is-invalid');
    }
    
    if (isValid) {
        // В реальном приложении здесь был бы код для отправки данных на сервер
        showNotification('Сообщение отправлено! Я свяжусь с вами в ближайшее время.', 'success');
        document.getElementById('contactForm').reset();
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Вспомогательные функции
function showNotification(message, type) {
    // Создаем элемент уведомления
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show alert-toast`;
    toast.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="flex-grow-1">
                ${message}
            </div>
            <button type="button" class="btn-close ms-2" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Добавляем уведомление на страницу
    document.body.appendChild(toast);
    
    // Автоматически удаляем уведомление через 5 секунд
    setTimeout(() => {
        if (toast.parentNode) {
            // Добавляем класс для анимации исчезновения
            toast.classList.add('fade-out');
            // Удаляем элемент после завершения анимации
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }, 5000);
    
    // Обработчик закрытия через кнопку
    toast.querySelector('.btn-close').addEventListener('click', function() {
        toast.classList.add('fade-out');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    });
}

// Статистика для дневника (дополнительная функция)
function getDiaryStats() {
    const totalEntries = diaryEntries.length;
    const completedEntries = diaryEntries.filter(entry => entry.status === 'completed').length;
    const inProgressEntries = diaryEntries.filter(entry => entry.status === 'in-progress').length;
    const plannedEntries = diaryEntries.filter(entry => entry.status === 'planned').length;
    
    return {
        totalEntries,
        completedEntries,
        inProgressEntries,
        plannedEntries,
        completionRate: totalEntries > 0 ? Math.round((completedEntries / totalEntries) * 100) : 0
    };
}

// Функция для экспорта данных дневника
function exportDiaryData() {
    const dataStr = JSON.stringify(diaryEntries, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diary-entries.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Функция для импорта данных дневника
function importDiaryData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            diaryEntries = importedData;
            saveDiaryEntries();
            renderDiaryEntries();
            showNotification('Данные успешно импортированы', 'success');
        } catch (error) {
            showNotification('Ошибка при импорте данных', 'danger');
        }
    };
    reader.readAsText(file);
}