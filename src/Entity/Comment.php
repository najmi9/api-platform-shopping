<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use App\Repository\CommentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *    itemOperations={
 *    "GET"={},
 *     "DELETE"={
 *             "security"="(is_granted('ROLE_ADMIN')) or
             (is_granted('ROLE_USER') and object.getUser() == user)",
              "security_message"="Sorry, but you are not the comment owner"
       },
 *     
 *     "PUT"={
 *           "security"="(is_granted('ROLE_ADMIN'))
             or (is_granted('ROLE_USER') and object.getUser() == user)",
 *           "security_message"="Sorry, but you are not the comment owner"
 *     }
 *    },
 *    collectionOperations={
 *       "GET" = { }, 
 *       "POST"={
 *              "security"="(is_granted('ROLE_ADMIN')) or (is_granted('ROLE_USER'))",
               "security_message"="tu peux pas ajouter un commenter si 
               ne vous êtez pas connecté ou un admin"     
 *       }
 *    },
 *     normalizationContext={"groups"={"comment:read"}},
 *     denormalizationContext={"groups"={"comment:write"}},
 * )
 * @ApiFilter(SearchFilter::class, properties={"product": "exact", "user":"exact"})
 * @ApiFilter(OrderFilter::class, properties={"createdAt": "DESC"})
 * @ORM\Entity(repositoryClass=CommentRepository::class)
 */
class Comment
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"comment:read", "comment:write"})
     * @Groups({"product-comment:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"comment:read", "comment:write"})
     * @Groups({"product-comment:read"})
     * @Assert\NotNull(message="le contenu du commentaire est ne peut pas 
     * être vide")
     * @Assert\NotBlank(message="le contenu du commentaire est ne peut pas 
     * être vide")
     * @Assert\Length(min=3, minMessage="votre message est trop cort",
     *  max=4000, maxMessage="votre message est trop long")
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="comments")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"comment:read"})
     * @Groups({"product-comment:read"})
     */
    public $user;

    /**
     * @ORM\ManyToOne(targetEntity=Product::class, inversedBy="comments")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"comment:read", "comment:write"})
     */
    private $product;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"product-comment:read"})
     * @Groups({"comment:read", "comment:write"})
     */
    private $createdAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
