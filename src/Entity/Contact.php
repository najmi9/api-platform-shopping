<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\ContactRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ContactRepository::class)
 * @ApiResource(  
 *  itemOperations={
 *     "GET"={ "security"="is_granted('ROLE_ADMIN')",
 *           "security_message"="vous avez pas le droit de voir les
 *            contact"},
 *     "DELETE"={
              "security"="is_granted('ROLE_ADMIN')" ,
              "security_message"="vous avez pas le droit de supprimer ce 
              contact"
        },
 *     
 *     "PUT"={
 *           "security"="is_granted('ROLE_ADMIN')",
 *           "security_message"="vous avez pas le droit de modifier
 *            ceontact"
 *      }
 *    },
 *    collectionOperations={
 *       "GET" = { 
 *           "security"="is_granted('ROLE_ADMIN')",
 *           "security_message"="vous avez pas le droit de voir les
 *            contact"
 *        }, 
 *       "POST"={}
 *    },
 
 *  )
 */
class Contact
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Email(message="Votre email est invalid !")
     * @Assert\NotBlank(message="Ce champ ne peut pas être vide !")
     * @Assert\NotNull(message="Ce champ ne peut pas être null !")
     */
    private $email;

    /**
     * @ORM\Column(type="text")
     * @Assert\Length(min=3, max=2000, minMessage="Vous dit presque rien !")
     * @Assert\NotBlank(message="Ce champ ne peut pas être vide !")
     * @Assert\NotNull(message="Ce champ ne peut pas être vide !")
     * @Assert\Type(type="string", message="Ce champ ne peut pas être que une châine de caractère !")
     */
    private $message;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }
}
