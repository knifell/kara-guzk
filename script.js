document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const newsGrid = document.querySelector('.news-list-view');
    const newsFullView = document.querySelector('.news-full-view');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    const backToNewsButton = document.querySelectorAll('.back-to-news-btn');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const filterButtons = document.querySelectorAll('.document-filters .filter-btn');
    const documentsList = document.querySelector('.documents-list');
    const gallerySearch = document.getElementById('gallery-search');
    const galleryGrid = document.querySelector('.gallery-grid');
    const calendarHeader = document.querySelector('.current-month');
    const calendarGrid = document.querySelector('.calendar-grid');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');

    // ����� ���������� ��� ����� ���������
    const appealForm = document.getElementById('appeal-form');

    // ������� ��� ������������ ��������� ������
    const showSection = (targetId) => {
        sections.forEach(section => {
            if (section.id === targetId) {
                section.style.display = 'block';
                // �������� ������ ���� ������� ��� �������� �� ������ ������
                newsGrid.style.display = 'grid';
                newsFullView.style.display = 'none';
            } else {
                section.style.display = 'none';
            }
        });
    };

    // ���������� ��� ���������
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            showSection(targetId);

            // ��������� ��������� ���� ����� �������
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // ���������� ��� ������ "�������� ��� �������"
    const newsCardLink = document.querySelector('.news-card .card-link');
    if (newsCardLink) {
        newsCardLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('news');
        });
    }

    // ����������� ��� "������ �����..."
    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const newsId = button.getAttribute('data-news-id');
            const fullArticle = document.getElementById(newsId);

            if (fullArticle) {
                newsGrid.style.display = 'none';
                newsFullView.style.display = 'block';
                fullArticle.style.display = 'block';
            }
        });
    });

    // ����������� ��� ������ "�������"
    backToNewsButton.forEach(button => {
        button.addEventListener('click', () => {
            newsGrid.style.display = 'grid';
            newsFullView.style.display = 'none';
            document.querySelectorAll('.full-article').forEach(article => {
                article.style.display = 'none';
            });
        });
    });

    // ���������� ��� ���������� ����
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // ���������� ����������
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            documentsList.querySelectorAll('li').forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ����� �� �������
    gallerySearch.addEventListener('input', () => {
        const query = gallerySearch.value.toLowerCase();
        galleryGrid.querySelectorAll('img').forEach(img => {
            const altText = img.getAttribute('alt').toLowerCase();
            const tags = img.getAttribute('data-tag').toLowerCase();
            if (altText.includes(query) || tags.includes(query)) {
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        });
    });

    // ��������� ��������� (���������� ������)
    const renderCalendar = (year, month) => {
        const date = new Date(year, month);
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const prevLastDay = new Date(year, month, 0).getDate();

        const monthNames = ["������", "�������", "����", "������", "���", "����", "����", "������", "��������", "�������", "������", "�������"];
        calendarHeader.textContent = `${monthNames[month]} ${year}`;

        calendarGrid.innerHTML = `
            <div class="day-name">��</div>
            <div class="day-name">��</div>
            <div class="day-name">��</div>
            <div class="day-name">��</div>
            <div class="day-name">��</div>
            <div class="day-name">��</div>
            <div class="day-name">��</div>
        `;

        let startDay = (firstDay === 0) ? 6 : firstDay - 1; // ���������, ��� ������ ���������� � ������������

        for (let i = startDay; i > 0; i--) {
            calendarGrid.innerHTML += `<div class="day other-month">${prevLastDay - i + 1}</div>`;
        }

        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = i;

            // ����� ����� �������� ������ ��� �������
            // ��������: if (i === 15) { dayDiv.classList.add('has-event'); }

            calendarGrid.appendChild(dayDiv);
        }
    };

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        currentYear = currentDate.getFullYear();
        currentMonth = currentDate.getMonth();
        renderCalendar(currentYear, currentMonth);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentYear = currentDate.getFullYear();
        currentMonth = currentDate.getMonth();
        renderCalendar(currentYear, currentMonth);
    });

    renderCalendar(currentYear, currentMonth);

    // ���������� ������� �������� ��� ��������
    showSection('home');

    // ----- ����� ��� ��� AJAX-�������� ����� -----
    if (appealForm) {
        appealForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // ������������� ����������� �������� ����� � ������������ ��������

            const formData = new FormData(appealForm);

            // ���� �� ������ ��������� �����, ���������������� ���� ����
            // const captchaValue = formData.get('captcha-input');
            // if (captchaValue !== '���_���_�����_�����') {
            //     alert('������������ ��� � ��������!');
            //     return;
            // }

            try {
                const response = await fetch('send_appeal.php', {
                    method: 'POST',
                    body: formData
                });

                const resultText = await response.text();

                // ������� � ���������� ��������� ������������
                const messageContainer = document.createElement('div');
                messageContainer.textContent = resultText;
                messageContainer.style.marginTop = '20px';
                messageContainer.style.padding = '15px';
                messageContainer.style.borderRadius = '8px';
                messageContainer.style.textAlign = 'center';

                if (response.ok) {
                    messageContainer.style.backgroundColor = '#d4edda';
                    messageContainer.style.color = '#155724';
                    appealForm.reset(); // ������� ����� ����� �������� ��������
                } else {
                    messageContainer.style.backgroundColor = '#f8d7da';
                    messageContainer.style.color = '#721c24';
                }

                appealForm.parentNode.insertBefore(messageContainer, appealForm.nextSibling);

                // ������������� ������� ��������� ����� 5 ������
                setTimeout(() => {
                    messageContainer.remove();
                }, 5000);

            } catch (error) {
                console.error('Error:', error);
                alert('��������� ������ ��� �������� �����.');
            }
        });
    }
    // ---------------------------------------------
});