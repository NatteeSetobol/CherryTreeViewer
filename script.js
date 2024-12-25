var node_count=1;

document.addEventListener('DOMContentLoaded', () => {
    const toggler = document.getElementsByClassName('caret');
    for (let i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener('click', function() {
            parentElement = this.parentElement
			const nested = parentElement.querySelector('.nested') as HTMLElement;
			nested.classList.toggle('active')
            //this.parentElement.querySelector('.nested').classList.toggle('active');
            this.classList.toggle('caret-down');
        });
    }
});


function AddNode(targetParentId, newParentName, isChild)
{
    const target = Array.from(document.querySelectorAll('.tree .caret')).find(
        node => node.id == targetParentId
    );

    if (!target)
    {
        console.error(`Parent node "$(targetParentName)"`);
        return ;
    }

    const newParentLi = document.createElement('li');
    const newParentCaret = document.createElement('span');
    if (isChild)
    {
        newParentCaret.classList.add('caret-none');
    } else {
        newParentCaret.classList.add('caret');
    }
    newParentCaret.text = "testing123"
    newParentCaret.textContent = newParentName;
    node_count = node_count + 1;
    newParentCaret.id = "" + node_count;

    newParentLi.appendChild(newParentCaret);

    const newParentUl = document.createElement('ul');
    newParentUl.classList.add('nested');
    newParentLi.appendChild(newParentUl)

    const targetUl = target.nextElementSibling;
    targetUl.appendChild(newParentLi);

    newParentCaret.addEventListener('click', function() {
        if (this.classList.contains('caret-none')) {
            alert(this.text);
        } else {
            newParentUl.classList.toggle('active');
            this.classList.toggle('caret-down');
        }
    });
}

function AddParentById(targetParentId, newParentName)
{
    AddNode(targetParentId, newParentName, false);
}

function AddChildToParentById(parentId, newChildName)
{
    AddNode(parentId, newChildName, true);
}
