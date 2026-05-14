document.getElementById('add-proposition').addEventListener('click', () => {

    // Créer un conteneur <div>
    const div = document.createElement('div');

    // Créer la case à cocher (checkbox)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Créer le champ texte de la proposition
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Entrer une proposition';

    // Ajouter checkbox et input dans le conteneur
    div.appendChild(checkbox);
    div.appendChild(input);

    // Ajouter le conteneur dans la zone des propositions
    document.getElementById('propositions').appendChild(div);

});
document.getElementById('form-question').addEventListener('submit', function(e) {

    e.preventDefault();

    // Lire les valeurs du formulaire
    const proprietaire = document.getElementById('proprietaire').value;
    const examen = document.getElementById('examen').value;
    const question = document.getElementById('question').value;
    const duree = document.getElementById('duree').value;
    const points = document.getElementById('points').value;

    // Collecter les propositions depuis le DOM
    const propositions = [];

    document.querySelectorAll('#propositions div').forEach(div => {

        const checkbox = div.querySelector('input[type="checkbox"]');
        const input = div.querySelector('input[type="text"]');

        propositions.push({
            texte: input.value,
            correcte: checkbox.checked
        });

    });

    // Récupérer les examens du localStorage
    const examens = JSON.parse(localStorage.getItem('examens')) || [];

    // Trouver l'examen par son nom
    const exam = examens.find(e => e.nom === examen);

    // Vérifier que l'examen existe
    if (!exam) {

        alert("Examen introuvable !");
        return;

    }

    // Construire la question et l'ajouter
    const nouvelleQuestion = {
        question,
        duree,
        points,
        propositions
    };

    exam.questions.push(nouvelleQuestion);

    localStorage.setItem('examens', JSON.stringify(examens));

    alert('Question ajoutée avec succès !');

    this.reset();

    document.getElementById('propositions').innerHTML = '';

});