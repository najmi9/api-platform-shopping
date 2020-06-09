<?php

namespace App\Entity;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CartRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 * collectionOperations={
 *     "get"={  },
 *     "post"={ },
 * },
 * itemOperations={
 *     "put"={  },
 *     "delete"={  },
 *     "get"={  },
 * },
 * normalizationContext={"groups"={"all-cart:read"}},
 * )
 * @ApiFilter(SearchFilter::class, properties={"user": "exact", "paid" : "exact"})
 * @ORM\Entity(repositoryClass=CartRepository::class)
 */
class Cart
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({ "all-cart:read" })
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({ "all-cart:read" })
     * 
     */
    private $quantity;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="carts")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Product::class, inversedBy="carts")
     * @Groups({ "all-cart:read" })
     */
    private $product;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({ "all-cart:read" })
     */
    private $createdAt;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({ "all-cart:read" })
     */
    private $paid;

    /**
     * @ORM\ManyToMany(targetEntity=Order::class, mappedBy="carts")
     */
    private $orders;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

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

    public function getPaid(): ?bool
    {
        return $this->paid;
    }

    public function setPaid(bool $paid): self
    {
        $this->paid = $paid;

        return $this;
    }

    /**
     * @return Collection|Order[]
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
            $order->addCart($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->contains($order)) {
            $this->orders->removeElement($order);
            $order->removeCart($this);
        }

        return $this;
    }

   
}
