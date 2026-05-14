document.getElementById('add-proposition').addEventListener('click', () => {

    // Créer un conteneur <div>
    const div = document.createElement('div');

    // Créer la case à cocher
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Créer le champ texte
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Entrer une proposition';

    // Ajouter les éléments dans div
    div.appendChild(checkbox);
    div.appendChild(input);

    // Ajouter div dans propositions
    document.getElementById('propositions').appendChild(div);

});


document.getElementById('form-question').addEventListener('submit', function(e) {

    e.preventDefault();

    // Lire les valeurs
    const proprietaire =
        document.getElementById('proprietaire').value.trim();

    const nomExamen =
        document.getElementById('examen').value.trim();

    const question =
        document.getElementById('question').value;

    const duree =
        document.getElementById('duree').value;

    const points =
        document.getElementById('points').value;

    // Tableau propositions
    const propositions = [];

    document.querySelectorAll('#propositions div').forEach(div => {

        const checkbox =
            div.querySelector('input[type="checkbox"]');

        const input =
            div.querySelector('input[type="text"]');

        propositions.push({
            texte: input.value,
            correcte: checkbox.checked
        });

    });

    // clé localStorage
    const key = 'examens_' + proprietaire.toLowerCase();

    // récupérer examens
    const examens =
        JSON.parse(localStorage.getItem(key)) || [];

    // trouver examen
    const exam = examens.find(
        e => e.nom.trim().toLowerCase() === nomExamen.toLowerCase()
    );

    // vérifier existence
    if (!exam) {

        alert('Examen introuvable !');
        return;

    }

    // créer question
    const nouvelleQuestion = {
        question,
        duree,
        points,
        propositions
    };

    // ajouter question
    exam.questions.push(nouvelleQuestion);

    // sauvegarder
    localStorage.setItem(key, JSON.stringify(examens));

    alert('Question ajoutée avec succès !');

    this.reset();

    document.getElementById('propositions').innerHTML = '';

});

