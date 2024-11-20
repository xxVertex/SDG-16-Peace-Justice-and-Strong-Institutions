document.addEventListener('DOMContentLoaded', () => {
    const feedbackTable = document.querySelector('#feedbackTable tbody');

    fetch('/api/feedback')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((feedbacks) => {
            feedbacks.forEach((feedback) => {
                const row = document.createElement('tr');

                // Map feedback data to table rows
                row.innerHTML = `
                    <td>${feedback.design_rating || '-'}</td>
                    <td>${feedback.favorite_subtopic || '-'}</td>
                    <td>${(feedback.website_likes || []).join(', ') || '-'}</td>
                    <td>${feedback.improvements || '-'}</td>
                    <td>${feedback.value_rating || '-'}</td>
                    <td>
                        Peace: ${feedback.rank_peace || '-'}, 
                        Justice: ${feedback.rank_justice || '-'}, 
                        Institutions: ${feedback.rank_institutions || '-'}
                    </td>
                    <td>${feedback.recommend || '-'}</td>
                    <td>${feedback.promotion_ideas || '-'}</td>
                `;
                feedbackTable.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error fetching feedback:', error);
        });
});