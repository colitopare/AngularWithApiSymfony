## ANGULAR :

## LES INTERCEPTEURS :

Permet d'intercepter une requête HTTP avant son envoi afin d'effectuer des manipulations / changements dessus (exemple : ajouter un header)

## LES GUARDS :

Permet de contrôler l'accès à une route

## LES RESOLVERS :

Permet de résoudre (d'obtenir) les données dont un composant a besoin AVANT d'afficher le composant. Il facilite la rédaction du composant qui n'a plus besoin d'appeler un service / d'observer une requête HTTP. Il se sert simplement de ce que le Resolver lui donne.

## LES EVENEMENTS DU ROUTER :

Le router émet régulièrement des événements (https://angular.io/api/router/Event) auxquels on peut souscrire pour y réagir.

// AJOUTER UNE FONCTION DELETE CUSTOMER

// Dans le fichier customer.components.html
<button class="btn btn-danger btn-sm" (click)="deleteCustomer(c.id)">
Supprimer
</button>

// Dans customer.service.ts
public delete(id: number) {
return this.http.delete<Customer>("http://localhost:8000/customers/" + id);
}

// Dans customers.components.ts
deleteCustomer(id) {
// Avant ce travail dans le client, il faut modifier la propriété 'invoices' dans l'entité 'Customer' de l'api (symfony)
// et ajouter 'orphanRemoval=true' en annotations pour authoriser la suppression des factures (invoices) liés à ce client
// ATTENTION: dans notre cas d'application client, c'est une très mauvaise pratique car on ne supprime jamais les factures ni le client, au pire on archive.
this.customerService.delete(id).subscribe(data => alert("Suppression OK"));
this.customerService
.findAll()
.subscribe(httpcustomers => (this.customers = httpcustomers));
}

// Dans l'api symfony
/\*\*
_ @ORM\OneToMany(targetEntity="App\Entity\Invoice", mappedBy="customer", orphanRemoval=true)
_ @Groups({"customer:read"})
\*/
private \$invoices;
