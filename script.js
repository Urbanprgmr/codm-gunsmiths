const weaponAttachments = {
    "AK-47": ["Red Dot Sight", "Suppressor", "Extended Mag", "Foregrip", "Laser Sight"],
    "M4": ["Holographic Sight", "Suppressor", "Extended Mag", "Foregrip", "Granulated Grip"],
    "DL Q33": ["Sniper Scope", "Suppressor", "FMJ Rounds", "Stock", "Bipod"],
    "Fennec": ["Laser Sight", "Extended Mag", "No Stock", "Suppressor", "Rear Grip Tape"]
};

function updateAttachments() {
    const gun = document.getElementById("gunSelect").value;
    const attachmentDiv = document.getElementById("attachments");
    attachmentDiv.innerHTML = "";

    if (gun in weaponAttachments) {
        weaponAttachments[gun].forEach(attachment => {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = attachment;
            checkbox.id = attachment;

            let label = document.createElement("label");
            label.htmlFor = attachment;
            label.textContent = attachment;

            attachmentDiv.appendChild(checkbox);
            attachmentDiv.appendChild(label);
            attachmentDiv.appendChild(document.createElement("br"));
        });
    }
}

function saveLoadout() {
    const gun = document.getElementById("gunSelect").value;
    const loadoutName = document.getElementById("loadoutName").value.trim();
    const attachments = Array.from(document.querySelectorAll("#attachments input:checked")).map(a => a.value);

    if (!gun || !loadoutName || attachments.length === 0) {
        alert("Please select a weapon, give a name, and choose attachments!");
        return;
    }

    const loadoutData = {
        name: loadoutName,
        weapon: gun,
        attachments: attachments
    };

    let savedLoadouts = JSON.parse(localStorage.getItem("loadouts")) || [];
    savedLoadouts.push(loadoutData);
    localStorage.setItem("loadouts", JSON.stringify(savedLoadouts));

    displayLoadouts();
}

function displayLoadouts() {
    const savedLoadouts = JSON.parse(localStorage.getItem("loadouts")) || [];
    const savedDiv = document.getElementById("savedLoadouts");
    savedDiv.innerHTML = "";

    savedLoadouts.forEach((loadout, index) => {
        let div = document.createElement("div");
        div.classList.add("saved-loadout");
        div.innerHTML = `
            <h3>${loadout.name}</h3>
            <p><strong>Weapon:</strong> ${loadout.weapon}</p>
            <p><strong>Attachments:</strong> ${loadout.attachments.join(", ")}</p>
            <button onclick="deleteLoadout(${index})">Delete</button>
        `;
        savedDiv.appendChild(div);
    });
}

function deleteLoadout(index) {
    let savedLoadouts = JSON.parse(localStorage.getItem("loadouts")) || [];
    savedLoadouts.splice(index, 1);
    localStorage.setItem("loadouts", JSON.stringify(savedLoadouts));
    displayLoadouts();
}

window.onload = displayLoadouts;
