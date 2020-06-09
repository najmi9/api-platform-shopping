<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use APiPlatform\Core\Annotation\APiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @APiResource(
 *   normalizationContext={"groups"="order:read"}
 * )
 * @ApiFilter(SearchFilter::class, properties={"paid": "true", "user": "exact"})
 * @ORM\Entity(repositoryClass=OrderRepository::class)
 * @ORM\Table(name="`order`")
 */
class Order
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"order:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=500)
     * @Groups({"order:read"})
     */
    private $payerId;

    /**
     * @ORM\Column(type="string", length=500)
     * @Groups({"order:read"})
     */
    private $paymentId;

    /**
     * @ORM\Column(type="string", length=500)
     * @Groups({"order:read"})
     */
    private $token;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"order:read"})
     */
    private $email;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"order:read"})
     */
    private $paid;


    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"order:read"})
     */
    private $country;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"order:read"})
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"order:read"})
     */
    private $linel;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"order:read"})
     */
    private $zip;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"order:read"})
     */
    private $state;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"order:read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"order:read"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="orders")
     * @Groups({"order:read"})
     */
    private $user;

    /**
     * @ORM\ManyToMany(targetEntity=Cart::class, inversedBy="orders")
     */
    private $carts;

    public function __construct()
    {
        $this->carts = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPayerId(): ?string
    {
        return $this->payerId;
    }

    public function setPayerId(string $payerId): self
    {
        $this->payerId = $payerId;

        return $this;
    }

    public function getPaymentId(): ?string
    {
        return $this->paymentId;
    }

    public function setPaymentId(string $paymentId): self
    {
        $this->paymentId = $paymentId;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): self
    {
        $this->token = $token;

        return $this;
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

    public function getPaid(): ?bool
    {
        return $this->paid;
    }

    public function setPaid(bool $paid): self
    {
        $this->paid = $paid;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getLinel(): ?string
    {
        return $this->linel;
    }

    public function setLinel(string $linel): self
    {
        $this->linel = $linel;

        return $this;
    }

    public function getZip(): ?string
    {
        return $this->zip;
    }

    public function setZip(string $zip): self
    {
        $this->zip = $zip;

        return $this;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): self
    {
        $this->state = $state;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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
        }

        return $this;
    }

    public function removeCart(Cart $cart): self
    {
        if ($this->carts->contains($cart)) {
            $this->carts->removeElement($cart);
        }

        return $this;
    }

    
}
