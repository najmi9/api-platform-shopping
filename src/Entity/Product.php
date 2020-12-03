<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\MediaObject;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 *  @ApiResource(
 *    itemOperations={
 *      "GET" = { 
 *          "normalization_context"={ 
 *          "groups" =  {"product-comment:read"} },
 *          "denormalization_context" = {
 *          "groups" = {"product-comment:write"}}
 *       },
 *      "DELETE" = {
 *        "security"="is_granted('ROLE_ADMIN')",
            "security_message"="Vous ne pouvez pas supprimer ce produit si vous êtez pas un admin."
 *        },
 *      "PUT" = {
 *          "security"="is_granted('ROLE_ADMIN')",
            "security_message"="Vous ne pouvez pas modifier ce produit si vous êtez pas un admin."
 *        }
 *    },
 *    collectionOperations={
 *       "GET"={
 *       "normalization_context"={ 
 *          "groups" =  {"products:read"} },
 *          "denormalization_context" = {
 *          "groups" = {"products:write"}}
 *       },
 *       "POST"={
 *         "security"="is_granted('ROLE_ADMIN')",
            "security_message"="Vous ne pouvez pas ajouter un nouveau produit si vous êtez pas un admin."
 *        }
 *    },
 *    normalizationContext={"groups"={"product:read"}},
 *    denormalizationContext={"groups"={"product:write"}},
 *  
 * )
 * 
 */
class Product
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"product:write", "product:read"})
     * @Groups({"comment:read", "comment:write"})
     * @Groups({"product-comment:read","products:read", "product-comment:write"})
     * @Groups({ "all-cart:read", "order:read", "like:read"})
     * @ApiProperty(iri="http://schema.org/id")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min=4, minMessage="votre titre est trop petit")
     * @Assert\NotBlank(message="le titre ne peut pas être null")
     * @Groups({"comment:read"})
     * @Groups({"product-comment:read", "product-comment:write"})
     * @Groups({ "all-cart:read", "order:read" })
     * @Groups({"order:read", "product:write", "product:read", "products:read"})
     * 
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"product:write", "product:read"})
     *  @Assert\Length(min=4, minMessage="votre description est trop petit")
     * @Assert\NotBlank(message="Description ne peut pas être null")
     * @Groups({"product-comment:read", "product-comment:write", "products:read"})
     * 
     */
    private $description;

  

    /**
     * @ORM\Column(type="string")
     * @Groups({"product:write", "product:read"})
     * @Assert\Type(type="string", message="le prix doit être valid")
     * @Assert\Length(min=1, minMessage="le prix est invalid")
     * @Assert\GreaterThan(value=0, message="le prix doît être suprieur à 0")
     * @Assert\NotBlank(message="le prix ne peut pas être null")
     * @Groups({"product-comment:read", "product-comment:write"})
     * @Groups({ "all-cart:read", "order:read", "order:read", "products:read"})
     */
    private $price;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="product")
     * @Groups({"product-comment:read"})
     * 
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=Cart::class, mappedBy="product")
     */
    private $carts;

    /**
     * @ORM\OneToMany(targetEntity=Like::class, mappedBy="product",  orphanRemoval=true)
     * @Groups({"product:read", "product-comment:read", "products:read"})
     */
    private $likes;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="products")
     * @Groups({"product:read", "product:write"})
     * @Groups({"product-comment:read", "products:read"})
     */
    private $category;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"product-comment:read", "product-comment:write"})
     * @Groups({"product:write", "product:read", "products:read"})
     */
    private $promo;

    /**
     * @ORM\Column(type="integer", nullable=true)
     *  @Groups({"product-comment:read", "product-comment:write"})
     * @Groups({"product:write", "product:read", "products:read"})
     * @Assert\GreaterThan(value=0, message="le quantité doît être suprieur à 0")
     * 
     */
    private $availableQuantity;

    /**
     * @ORM\ManyToOne(targetEntity=MediaObject::class, inversedBy="products")
     * @ApiProperty(iri="http://schema.org/image")
     * @Groups({"product:write", "product:read", "comment:read", "order:read"})
     * @Groups({"product-comment:read", "product-comment:write"})
     * @Groups({ "all-cart:read", "order:read", "products:read" })
     */
    private $picture;

   

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->carts = new ArrayCollection();
        $this->likes = new ArrayCollection();
        $this->picture = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price)
    {
        $this->price = $price;
        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setProduct($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getProduct() === $this) {
                $comment->setProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Cart[]
     */
    public function getCarts(): Collection
    {
        return $this->carts;
    }

    public function addCart(Cart $cart): self
    {
        if (!$this->carts->contains($cart)) {
            $this->carts[] = $cart;
            $cart->setProduct($this);
        }

        return $this;
    }

    public function removeCart(Cart $cart): self
    {
        if ($this->carts->contains($cart)) {
            $this->carts->removeElement($cart);
            // set the owning side to null (unless already changed)
            if ($cart->getProduct() === $this) {
                $cart->setProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Like[]
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(Like $like): self
    {
        if (!$this->likes->contains($like)) {
            $this->likes[] = $like;
            $like->setProduct($this);
        }

        return $this;
    }

    public function removeLike(Like $like): self
    {
        if ($this->likes->contains($like)) {
            $this->likes->removeElement($like);
            // set the owning side to null (unless already changed)
            if ($like->getProduct() === $this) {
                $like->setProduct(null);
            }
        }

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getPromo(): ?string
    {
        return $this->promo;
    }

    public function setPromo(?string $promo): self
    {
        $this->promo = $promo;

        return $this;
    }

    public function getAvailableQuantity(): ?int
    {
        return $this->availableQuantity;
    }

    public function setAvailableQuantity(?int $availableQuantity): self
    {
        $this->availableQuantity = $availableQuantity;

        return $this;
    }

    public function getPicture(): ?MediaObject
    {
        return $this->picture;
    }

    public function setPicture(?MediaObject $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

}
