<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CancledOrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource
 * @ORM\Entity(repositoryClass=CancledOrderRepository::class)
 */
class CancledOrder
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $paymentID;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $paymentToken;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $intent;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $billingID;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="cancledOrders")
     */
    private $user;

    public function __construct()
    {
        $this->user = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPaymentID(): ?string
    {
        return $this->paymentID;
    }

    public function setPaymentID(string $paymentID): self
    {
        $this->paymentID = $paymentID;

        return $this;
    }

    public function getPaymentToken(): ?string
    {
        return $this->paymentToken;
    }

    public function setPaymentToken(string $paymentToken): self
    {
        $this->paymentToken = $paymentToken;

        return $this;
    }

    public function getIntent(): ?string
    {
        return $this->intent;
    }

    public function setIntent(string $intent): self
    {
        $this->intent = $intent;

        return $this;
    }

    public function getBillingID(): ?string
    {
        return $this->billingID;
    }

    public function setBillingID(string $billingID): self
    {
        $this->billingID = $billingID;

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

    /**
     * @return Collection|User[]
     */
    public function getUser(): Collection
    {
        return $this->user;
    }

    public function addUser(User $user): self
    {
        if (!$this->user->contains($user)) {
            $this->user[] = $user;
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->user->contains($user)) {
            $this->user->removeElement($user);
        }

        return $this;
    }
}
