<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 *  @ApiResource(
 *    itemOperations={"GET" = { "normalization_context"={ 
 *         "groups" =  {"product-comment:read"} },
 *          "denormalization_context" = {
 *          "groups" = {"product-comment:write"}}
 *       },
 *      "DELETE",
 *      "PUT"
 *    },
 *    collectionOperations={"GET", "POST"},
 *    normalizationContext={"groups"={"product:read"}},
 *    denormalizationContext={"groups"={"product:write"}},
 *  
 * )
 * @ApiFilter(SearchFilter::class, properties={"user": "exact", "product": "exact"})
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
     * @Groups({"product-comment:read", "product-comment:write"})
     * @Groups({ "all-cart:read", "order:read" })
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"product:write", "product:read"})
     * @Assert\Length(min=4, minMessage="votre titre est trop petit")
     * @Assert\NotBlank(message="le titre ne peut pas être null")
     * @Groups({"comment:read"})
     * @Groups({"product-comment:read", "product-comment:write"})
     * @Groups({ "all-cart:read", "order:read" })
     * 
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"product:write", "product:read"})
     *  @Assert\Length(min=4, minMessage="votre description est trop petit")
     * @Assert\NotBlank(message="Description ne peut pas être null")
     * @Groups({"product-comment:read", "product-comment:write"})
     * 
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"product:write", "product:read"})
     * Assert\Url(message="l'url n'est pas valide")
     * @Groups({"comment:read"})
     * @Groups({"product-comment:read", "product-comment:write"})
     * @Groups({ "all-cart:read", "order:read"  })
     */
    private $picture;

    /**
     * @ORM\Column(type="string")
     * @Groups({"product:write", "product:read"})
     * @Assert\Type(type="string", message="le prix doit être valid")
     * @Assert\Length(min=3, minMessage="le prix est invalid")
     * @Assert\NotBlank(message="le prix ne peut pas être null")
     * 
     * @Groups({"product-comment:read", "product-comment:write"})
     * @Groups({ "all-cart:read", "order:read" })
     */
    private $price;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="product")
     * @Groups({"product-comment:read", "order:read"})
     * 
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=Cart::class, mappedBy="product")
     */
    private $carts;

    /**
     * @ORM\OneToMany(targetEntity=Like::class, mappedBy="product",  orphanRemoval=true)
     * @Groups({"product:read", "product:read"})
     * @Groups({"product-comment:read"})
     */
    private $likes;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="products")
     * @Groups({"product:read"})
     * @Groups({"product-comment:read"})
     */
    private $category;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"product-comment:read", "product-comment:write"})
     * @Groups({"product:write", "product:read"})
     */
    private $promo;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->carts = new ArrayCollection();
        $this->likes = new ArrayCollection();
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

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(string $picture)
    {
        $this->picture = $picture;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price)
    {
        $this->price = $price;
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
   }
